import { MoreVertical, Users } from "lucide-react";
import type { AppUser, ClientSummary, UpsertAppUser } from "../../utils/chatbotAdminApi";
import type { Lang } from "../../utils/i18n";
import { Select, TextInput } from "./PortalPrimitives";
import type { AdminLabels, UserClientMode } from "./dashboardUtils";
import { OWNER_EMAIL } from "./dashboardUtils";

type NewClientForm = {
  account_name: string;
  title: string;
  allowed_origins: string;
  primary_color: string;
  rate_limit_per_minute: number;
};

export function UsersSection({
  labels,
  lang,
  clients,
  employeeUsers,
  clientUsers,
  userClientMode,
  setUserClientMode,
  userForm,
  setUserForm,
  newUserClientForm,
  setNewUserClientForm,
  saveUser,
  startImpersonation,
  toggleUserActive,
  saving,
  openUserMenu,
  setOpenUserMenu,
}: {
  labels: AdminLabels;
  lang: Lang;
  clients: ClientSummary[];
  employeeUsers: AppUser[];
  clientUsers: AppUser[];
  userClientMode: UserClientMode;
  setUserClientMode: (mode: UserClientMode) => void;
  userForm: UpsertAppUser;
  setUserForm: (form: UpsertAppUser) => void;
  newUserClientForm: NewClientForm;
  setNewUserClientForm: (form: NewClientForm) => void;
  saveUser: () => void;
  startImpersonation: (target: AppUser) => void;
  toggleUserActive: (target: AppUser) => void;
  saving: boolean;
  openUserMenu: string;
  setOpenUserMenu: (key: string) => void;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
      {openUserMenu && <button type="button" aria-label="Close actions menu" className="fixed inset-0 z-40 cursor-default bg-transparent" onClick={() => setOpenUserMenu("")} />}
      <section className="border border-white/10 bg-white/[0.035] p-5">
        <h2 className="mb-5 text-xl font-semibold">{labels.createUser}</h2>
        <div className="space-y-3">
          <div className="grid grid-cols-3 border border-white/10 bg-slate-950 p-1 text-sm">
            {(["existing", "new", "global"] as const).map((mode) => <button key={mode} type="button" onClick={() => { setUserClientMode(mode); setUserForm({ ...userForm, role: mode === "global" ? "admin" : "user" }); }} className={`px-3 py-2 font-semibold ${userClientMode === mode ? "bg-[var(--color-primary)] text-slate-950" : "text-slate-400 hover:text-white"}`}>{mode === "existing" ? labels.existingClient : mode === "new" ? labels.newClient : labels.global}</button>)}
          </div>
          {userClientMode === "existing" && <Select className="w-full" value={userForm.client_slug || ""} onChange={(e) => setUserForm({ ...userForm, client_slug: e.target.value })}><option value="">{labels.selectClient}</option>{clients.map((client) => <option key={client.client_slug} value={client.client_slug}>{client.client_slug}</option>)}</Select>}
          {userClientMode === "new" && <div className="space-y-3 border border-white/10 bg-slate-950 p-3">
            <TextInput className="w-full" placeholder={labels.accountName} value={newUserClientForm.account_name} onChange={(e) => setNewUserClientForm({ ...newUserClientForm, account_name: e.target.value })} />
            <textarea className="w-full border border-white/10 bg-[#050711] p-4 font-mono text-sm text-white" rows={4} placeholder="https://cliente.com" value={newUserClientForm.allowed_origins} onChange={(e) => setNewUserClientForm({ ...newUserClientForm, allowed_origins: e.target.value })} />
          </div>}
          {userClientMode === "global" && <div className="border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300">Admin</div>}
          <TextInput className="w-full" placeholder="email@cliente.com" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
          <TextInput type="password" className="w-full" placeholder={labels.tempPassword} value={userForm.password || ""} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} />
          <label className="flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={userForm.is_active} onChange={(e) => setUserForm({ ...userForm, is_active: e.target.checked })} /> {labels.active}</label>
          <button onClick={saveUser} disabled={saving} className="inline-flex items-center gap-2 bg-[var(--color-primary)] px-5 py-3 font-semibold text-slate-950 disabled:opacity-60"><Users className="h-4 w-4" />{labels.saveUser}</button>
        </div>
      </section>
      <section className="space-y-5">
        {[
          [lang === "es" ? "Admins (empleados)" : "Admins (employees)", employeeUsers],
          [lang === "es" ? "Clientes" : "Clients", clientUsers],
        ].map(([title, list]) => (
          <div key={title as string} className="overflow-visible border border-white/10 bg-white/[0.035]">
            <div className="border-b border-white/10 px-4 py-3 text-sm font-semibold text-slate-300">{title as string}</div>
            <div className="divide-y divide-white/10">{(list as AppUser[]).map((item) => {
              const isOwner = item.email.toLowerCase() === OWNER_EMAIL;
              const menuKey = `${title}-${item.email}`;
              return <div key={item.email} className="grid gap-2 px-4 py-4 text-sm md:grid-cols-[1.1fr_0.55fr_0.65fr_0.45fr_44px]"><span className="font-medium text-white">{item.email}{isOwner ? " · Owner" : ""}</span><span className="text-slate-300">{item.role}</span><span className="text-slate-400">{item.client_slug || labels.global}</span><span className={item.is_active ? "text-emerald-300" : "text-red-300"}>{item.is_active ? labels.active : labels.disabled}</span><div className="relative flex justify-end"><button onClick={() => setOpenUserMenu(openUserMenu === menuKey ? "" : menuKey)} className="flex h-9 w-9 items-center justify-center text-slate-400 transition hover:text-white" aria-label="Actions"><MoreVertical className="h-4 w-4" /></button>{openUserMenu === menuKey && <div className="absolute right-0 top-9 z-50 w-44 border border-white/10 bg-slate-950 p-1 shadow-2xl shadow-black/30"><button onClick={() => { setOpenUserMenu(""); startImpersonation(item); }} className="block w-full px-3 py-2 text-left text-xs font-semibold text-slate-300 hover:bg-white/10">{labels.viewAs}</button><button onClick={() => { setOpenUserMenu(""); void toggleUserActive(item); }} disabled={isOwner || saving} className="block w-full px-3 py-2 text-left text-xs font-semibold text-slate-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40">{item.is_active ? (lang === "es" ? "Desactivar" : "Deactivate") : (lang === "es" ? "Activar" : "Activate")}</button></div>}</div></div>;
            })}{!(list as AppUser[]).length && <div className="px-4 py-6 text-sm text-slate-500">{labels.noData}</div>}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
