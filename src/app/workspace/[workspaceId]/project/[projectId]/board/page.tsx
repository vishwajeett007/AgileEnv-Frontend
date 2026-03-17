"use client";

import React from "react";

export default function KanbanBoardPage() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{
        __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .sidebar-active {
            background-color: rgba(18, 110, 222, 0.1);
            color: #126ede;
        }
      `}} />
      <div className="bg-[#f6f7f8] dark:bg-[#101822] font-sans text-slate-900 dark:text-slate-100 min-h-[max(884px,100dvh)]">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="p-6 flex items-center gap-3">
              <div className="bg-[#126ede] size-8 rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">bolt</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight">AgileFlow</h1>
            </div>
            <nav className="flex-1 px-4 space-y-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-4">Projects</div>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg sidebar-active font-medium" href="#">
                <span className="material-symbols-outlined">grid_view</span>
                Dashboard
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                <span className="material-symbols-outlined">folder</span>
                Active Sprints
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                <span className="material-symbols-outlined">analytics</span>
                Reports
              </a>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-4">Organization</div>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                <span className="material-symbols-outlined">group</span>
                Team
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                <span className="material-symbols-outlined">settings</span>
                Settings
              </a>
            </nav>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <img className="size-8 rounded-full" data-alt="User avatar profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpjbX_1M__PqXoYUR07sWvx0xIY8oMl9Sjs9wwBABN1uziLcyP8035-aFNHvNIt5hosxymDCyCXcOFd_dJJyjIDQz2chLAovluxWHifh2sDwffv40Q3SesYMpkog1dNJzL5XHHpaEzfmVyZN0UznWqaGCbvRhGACziR2pP1kXCdfEHrMUe9BYfXFe0Y5NO1_Wl10afx6IWWopcgW3LKl56PVkBfnXCL6pfL1THZasOvl_lAvf__F8RNYOBzIZZi5MAp5wy0S-ZYuA" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">Alex Rivera</p>
                  <p className="text-xs text-slate-500 truncate">Admin</p>
                </div>
              </div>
            </div>
          </aside>
          {/* Main Content */}
          <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Top Header */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <button className="md:hidden text-slate-500">
                    <span className="material-symbols-outlined">menu</span>
                  </button>
                  <h2 className="text-xl font-bold">Cloud Infrastructure</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative hidden sm:block">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                    <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-[#126ede] outline-none" placeholder="Search tasks..." type="text" />
                  </div>
                  <button className="bg-[#126ede] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">add</span>
                    Create
                  </button>
                </div>
              </div>
              {/* View Switchers */}
              <div className="px-6 flex gap-8">
                <a className="flex flex-col items-center border-b-2 border-[#126ede] text-[#126ede] pb-3 pt-2" href="#">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">view_kanban</span>
                    <p className="text-sm font-bold">Board</p>
                  </div>
                </a>
                <a className="flex flex-col items-center border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pb-3 pt-2 transition-colors" href="#">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">list_alt</span>
                    <p className="text-sm font-bold">Backlog</p>
                  </div>
                </a>
                <a className="flex flex-col items-center border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pb-3 pt-2 transition-colors" href="#">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <p className="text-sm font-bold">Timeline</p>
                  </div>
                </a>
              </div>
            </header>
            {/* Kanban Board Area */}
            <div className="flex-1 overflow-x-auto bg-[#f6f7f8] dark:bg-[#101822] p-6">
              <div className="flex gap-6 h-full min-w-max">
                {/* Column: Todo */}
                <div className="flex flex-col w-80 shrink-0">
                  <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Todo</h3>
                      <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold px-2 py-0.5 rounded-full">4</span>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <span className="material-symbols-outlined text-lg">more_horiz</span>
                    </button>
                  </div>
                  <div className="flex flex-col gap-3 overflow-y-auto">
                    {/* Task Card 1 */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-[#126ede]/50 cursor-grab active:cursor-grabbing transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Engineering</span>
                        <span className="material-symbols-outlined text-orange-500 text-lg">priority_high</span>
                      </div>
                      <h4 className="text-sm font-semibold mb-4 leading-relaxed">Implement OAuth2 provider with Refresh Tokens</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-slate-400">
                          <span className="material-symbols-outlined text-xs">chat_bubble</span>
                          <span className="text-xs">3</span>
                        </div>
                        <img className="size-6 rounded-full border-2 border-white dark:border-slate-800" data-alt="Team member avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfm_sqOUr_lTUPd-QJGFHsxA4VZopaI9MU8p9mqoKkv_bONJLiUJAqXB8SpvIPR-ghCoOgI-fSmVWNyZIpMPvbRFTmUtZvx-xiZAGih3iXsf8FNS9LVRLFwag8qKsrl_5LdKrF-VhWiguV_JazRkHBl9k3oi8jNazSpkkx_sKua0bLs_7sqc_32Mi6T2tHCD6LksMuqFuRNgSdFUUk_YXUr-24FQbuiqMLKywEWdLp0BXtfQ4g6TzUZJBVOGkKFrPE7ljIw4OhvS0" />
                      </div>
                    </div>
                    {/* Task Card 2 */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-[#126ede]/50 cursor-grab transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Design</span>
                        <span className="material-symbols-outlined text-slate-300 text-lg">low_priority</span>
                      </div>
                      <h4 className="text-sm font-semibold mb-4 leading-relaxed">Review dark mode contrast ratios in settings</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-slate-400">
                          <span className="material-symbols-outlined text-xs">attachment</span>
                          <span className="text-xs">2</span>
                        </div>
                        <img className="size-6 rounded-full border-2 border-white dark:border-slate-800" data-alt="Team member avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALD-qoaSXtmjx-sAzxi65BCRKVqetDFTjWPHx2mlXUcZfe_PyNusgZofvNeW6tpvUDzzowWkdPO7eQglxvzrqIAyPW1euzeZk2j8qy2BQLKoBWxoz06zQkuDlqbc8P9fde-HNsMs7yefViwnxS-2Mlg_0K3G3k5pwgmX3aR_CQoDzL9PGupQ-_Xu4tL7GN_06lwp63oZUlhLegS1XAQx_5IWFjPahUSuWPGCO2srYu4ZroMB2TTv-2yMH-Z9E0h8RqjiWGHW_MxYY" />
                      </div>
                    </div>
                    <button className="py-2 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      + Add Issue
                    </button>
                  </div>
                </div>
                {/* Column: In Progress */}
                <div className="flex flex-col w-80 shrink-0">
                  <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">In Progress</h3>
                      <span className="bg-[#126ede]/10 text-[#126ede] text-xs font-bold px-2 py-0.5 rounded-full">2</span>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <span className="material-symbols-outlined text-lg">more_horiz</span>
                    </button>
                  </div>
                  <div className="flex flex-col gap-3 overflow-y-auto">
                    {/* Task Card 3 */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border-l-4 border-l-[#126ede] border border-slate-200 dark:border-slate-700 hover:border-[#126ede]/50 cursor-grab transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">DevOps</span>
                        <span className="material-symbols-outlined text-red-500 text-lg font-bold">double_arrow</span>
                      </div>
                      <h4 className="text-sm font-semibold mb-4 leading-relaxed">Migrate Kubernetes cluster to v1.28 nodes</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-slate-400">
                            <span className="material-symbols-outlined text-xs">chat_bubble</span>
                            <span className="text-xs">12</span>
                          </div>
                        </div>
                        <div className="flex -space-x-2">
                          <img className="size-6 rounded-full border-2 border-white dark:border-slate-800" data-alt="Team member avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIt3pVdX8MznMlgOPwfV-RgB6eF1Ufh75btWS7vqv3JzdvN-UwSg3btPuIR1JAu71u_hNbq6RrnyqB0Ec3XO-h1l7jYZIwhI5pq_WuiiWjnPaRoV-MWVj4RPDUAZ4A8u6cYWeJAawp2mlPv9B0M-_uyW_hyIjCWL1yU25b2PmJPl8A_mcwlBK2yJtlgm5n9ohxbmuMS7R_ibdkUlkbhrqP2iq7S4Z3Au_Nwez4pV-I85lKfGnUOTQblmfUKGM7uJK3DhooFiC_F5w" />
                          <img className="size-6 rounded-full border-2 border-white dark:border-slate-800" data-alt="Team member avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKHliQMx-k_cORQ_IupC-YCCfj4L_S2pDhS-9fXjMWjI0XBiC5OLwj6rxCjPUmVA1m9JHxSmrk6n716Sg44cYn_uX977EpEYmEIu4XYUezcxcSpq7EYLjX2GlPhW821GfdTe8ebIstemeiUcW_aFIexbODjOhTJ6NmJNvetRADDPsYiodRTOI5QR4T86a9GfpzNcQsMx26zr9hEKuOGiAnbCxGos8b1kkoTWMfJDSSM0zRF3HVAJZ5Ux5a64IXSlrYhCYYOE5Klh4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Column: Done */}
                <div className="flex flex-col w-80 shrink-0">
                  <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Done</h3>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">12</span>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <span className="material-symbols-outlined text-lg">more_horiz</span>
                    </button>
                  </div>
                  <div className="flex flex-col gap-3 overflow-y-auto">
                    {/* Task Card 4 */}
                    <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 grayscale-[0.5]">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400">Marketing</span>
                        <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                      </div>
                      <h4 className="text-sm font-semibold mb-4 leading-relaxed text-slate-500 line-through">Draft announcement for v2.4 launch</h4>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-slate-400 italic">Completed 2d ago</div>
                        <img className="size-6 rounded-full opacity-60" data-alt="Team member avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoNCTrJRQieqHaMtxnuFhmv4YgVjP6X4WBDml0dPnKj2LINKacXGGDbCLn10qugAtnELry_yPt_tYYCS0b2-FCZENvrYYHrdf-r-kf4g5P-IOWccRrtWRJ47YQu4nJKXhtPCGnbkGNpHcaXWPqXK4EMgquBTZzxBg5Kj3ft1ctzgMoHTYqqu-uYAS2TzJLo6LkANArai1TSmTKF6QA1rVwJKnle7cGnVb7MGJhy_fVF_6cZBhgskBwfFvdHcMHb33-g35Bo0pg5nY" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom Nav (Mobile Only) */}
            <div className="md:hidden flex gap-2 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pb-4 pt-2">
              <a className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg text-[#126ede]" href="#">
                <div className="flex h-8 items-center justify-center">
                  <span className="material-symbols-outlined">view_kanban</span>
                </div>
                <p className="text-[10px] font-bold">Board</p>
              </a>
              <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400" href="#">
                <div className="flex h-8 items-center justify-center">
                  <span className="material-symbols-outlined">list_alt</span>
                </div>
                <p className="text-[10px] font-medium">Tasks</p>
              </a>
              <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400" href="#">
                <div className="flex h-8 items-center justify-center">
                  <span className="material-symbols-outlined">notifications</span>
                </div>
                <p className="text-[10px] font-medium">Updates</p>
              </a>
              <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400" href="#">
                <div className="flex h-8 items-center justify-center">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <p className="text-[10px] font-medium">Profile</p>
              </a>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
