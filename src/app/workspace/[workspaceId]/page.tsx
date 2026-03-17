"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function WorkspaceDashboard({ params }: { params: { workspaceId: string } }) {
  const router = useRouter();
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{
        __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}} />
      <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 font-sans min-h-[max(884px,100dvh)]">
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
          {/* Top Header */}
          <header className="flex items-center bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 h-14 sticky top-0 z-10">
            <div className="flex items-center gap-2 group cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 px-2 py-1 rounded transition-colors">
              <div className="size-6 bg-[#126ede] rounded flex items-center justify-center text-white text-xs font-bold">A</div>
              <h2 className="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-tight tracking-tight">Acme Corp</h2>
              <span className="material-symbols-outlined text-slate-400 text-lg">unfold_more</span>
            </div>
            <div className="flex-1 flex justify-center px-4 max-w-xl mx-auto">
              <div className="relative w-full group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-[#126ede] transition-colors">search</span>
                <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-1.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-[#126ede] transition-all outline-none" placeholder="Search issues, projects..." type="text" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                  <kbd className="hidden md:inline-flex h-5 items-center rounded border border-slate-300 dark:border-slate-700 px-1.5 font-sans text-[10px] font-medium text-slate-500">⌘</kbd>
                  <kbd className="hidden md:inline-flex h-5 items-center rounded border border-slate-300 dark:border-slate-700 px-1.5 font-sans text-[10px] font-medium text-slate-500">K</kbd>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                <span className="material-symbols-outlined text-xl">notifications</span>
              </button>
              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-800">
                <img alt="User profile" className="w-full h-full object-cover" data-alt="Minimalist user avatar icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaLz8I6iLL1sra_KufHoqaJbEgW2CExb3l8VYLOtqCN5VTNM6Ao_Ds8sbazw3pOBdO5TmoLxamuQSErnhFXBVYpmT-ICfaiQsBn1Zz8Mew4Q2Jc81jxXwB2gdC2egOcW841vo726LcXBA1aXI2WrD9Ci9y-8dO_wID6UXye5MO9RFdo2MKgQLEDXgLfwQZj7WztKkLKYXjIx6wNfwzj0l_GKXquWI-8MPcVpmyGYjRk9nfarClMDAgOZJ0169xnGF_gq_z-8yrMyA" />
              </div>
            </div>
          </header>

          {/* Navigation Tabs */}
          <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6">
            <div className="flex gap-8">
              <a className="flex items-center border-b-2 border-[#126ede] text-slate-900 dark:text-slate-100 h-12" href="#">
                <p className="text-sm font-medium">Dashboard</p>
              </a>
              <a className="flex items-center border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 h-12" href="#">
                <p className="text-sm font-medium">My Issues</p>
              </a>
              <a className="flex items-center border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 h-12" href="#">
                <p className="text-sm font-medium">Projects</p>
              </a>
              <a className="flex items-center border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 h-12" href="#">
                <p className="text-sm font-medium">Views</p>
              </a>
            </div>
          </nav>

          <main className="flex-1 flex flex-col md:flex-row p-6 gap-8 mx-auto w-full">
            {/* Left Column: Recent Projects & Issues */}
            <div className="flex-1 flex flex-col gap-8">
              {/* Recent Projects Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-900 dark:text-slate-100 text-lg font-semibold tracking-tight">Recent Projects</h3>
                  <button className="text-[#126ede] text-sm font-medium hover:underline">View all</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Project Card 1 */}
                  <div className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-[#126ede]/50 transition-all">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">rocket_launch</span>
                    </div>
                    <h4 className="text-slate-900 dark:text-slate-100 font-medium mb-1 group-hover:text-[#126ede] transition-colors" onClick={() => router.push(`/workspace/${params.workspaceId}/project/1/board`)}>Mobile App Rebrand</h4>
                    <p className="text-slate-500 text-xs leading-relaxed mb-4">Phase 2: UI Implementation and asset delivery.</p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <img alt="Jane" className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900" data-alt="Team member profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-WR5N222VUVWg7v3L2HX8PgpFjt4rHPv9ek7xVfOE51AvHOnYnCaszY-BObvvL6fLbetNpNfONJux-LacqxuNL98_E4XO4DwMUA-LVuHjvshQbicGGsvdUvKiZ__GuisYq0TktHb9buIQZ5NW3CjqmrC39FyCvAQiTCLatqwcguA7QtnUz-jq_eOJ3YTdkvzd3BPKKm1rPBbpTNMoQMwnPgXULcvEdnGgxJ3diJFGmcVsfQWtpKSAKwvIF_rJ3HqRTUoVOGittiU" />
                        <img alt="John" className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900" data-alt="Team member profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu4K2fSFJBSfRsrbavxIjsEMcKN2r0h_MYwr8avVgLIzFpq7OxBNu5pUFNC8uEaC6oNqblP_akCFwHbYvkwiLvAQYWPwRWdd7JexT447y3koGw71T-LCmOorItR8Y-JY8NVa0laNTo8EIiQWdP9vrWd5uJr2RQn7vjQuOyxR4vwxmeKS_4_5mjlhu1nDOyhZEHcJqYjlJ_YC0DUxTwKDO9PsJQLBPgwS2NKKiPVgikltQuRUiVGpKFwvRkhf8zuxSYCpCiT54kepo" />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">In Progress</span>
                    </div>
                  </div>
                  {/* Project Card 2 */}
                  <div className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-[#126ede]/50 transition-all">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">database</span>
                    </div>
                    <h4 className="text-slate-900 dark:text-slate-100 font-medium mb-1 group-hover:text-[#126ede] transition-colors" onClick={() => router.push(`/workspace/${params.workspaceId}/project/1/board`)}>API V2 Migration</h4>
                    <p className="text-slate-500 text-xs leading-relaxed mb-4">Upgrading infrastructure for global scalability.</p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <img alt="Bob" className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900" data-alt="Team member profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDowHdctGjjsBvcvu4Z62Us7mTUDWS68iJvMJ_KUjzAS6xXTuQ26RAm6a3gD2DYxSD2y9n4g1Voqi0f1M-iPguGCzFVkSjLItBU5r_8CR4T6KYdom4w-6Os58yA4X2PGMPu2PSYALPAOxnqSGsdtfYGQ-rugdM4wiutG5GKlrHe_VqyXccrBnWK-N1zpfwF_V5Jt0fXo2NNp4Zpdr0y_lxLnfE7ff5-cIOzt_tv-AF0NTg1yhhFyUJSl63sv5Rb-T5x8qaX_IIilIk" />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">Planning</span>
                    </div>
                  </div>
                  {/* Project Card 3 */}
                  <div className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-[#126ede]/50 transition-all">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400">auto_awesome</span>
                    </div>
                    <h4 className="text-slate-900 dark:text-slate-100 font-medium mb-1 group-hover:text-[#126ede] transition-colors" onClick={() => router.push(`/workspace/${params.workspaceId}/project/1/board`)}>AI Features</h4>
                    <p className="text-slate-500 text-xs leading-relaxed mb-4">Integrating LLM suggestions for issue labels.</p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <img alt="Alice" className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900" data-alt="Team member profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsex-xxy2EJaJvSI_JynD7Xket-bGSCOTZ-5IoqWLeG9t_PtVBzDA4iJiUuVpql4VeQNiVf5Mbd0D7zR4y24ZFzgqwKW7uhP6o5RsNGsQGqleAh2ldGPAEMePAzHQgimoKJX8bC_gkFa8cYGdu9s8QoPH6BRurdPQeZfMirv6loLELot33J0OTWy2ww2I3UVsCWzdt5zal_rY8egGXAEhXJqOnI79bouXbd_AHRfEQDAFaUnuI75q-hF3mQsnZeHf9I94aQSYkRxA" />
                        <img alt="Tom" className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900" data-alt="Team member profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJIs_-6MQFC-8z9TFEuezWETLsp1LntHjyhtkLhBx8TyD2hmdnJeGRPkeH3uzHmxl1nIbJw59IwuOGeKa9bYVWtU3R6nGF-JC_K8VeeHB8n3wiXZszFMqI2GossAO9rFE_fB9cJjcq0KLAM8W5mDTzpwPOBrkt5_ImRCtsLOBEdGdi1aoq3O38yorG8bjhfCeQGs04mjTMIaFTier7CAU73vmVzPZOMJf-P4jvNER5ZGZXoXWr4t-km79QAmcxao7tB-hXHa_Kzig" />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">Paused</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Assigned Issues List */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-900 dark:text-slate-100 text-lg font-semibold tracking-tight">Assigned to Me</h3>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <span className="material-symbols-outlined text-base">filter_list</span> Filter
                    </button>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  {/* Issue Row 1 */}
                  <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 transition-colors cursor-pointer group">
                    <span className="material-symbols-outlined text-orange-500 text-lg">error</span>
                    <span className="text-slate-400 text-xs font-mono w-16">ACM-102</span>
                    <p className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200 truncate">Fix broken layout on mobile notification panel</p>
                    <div className="flex items-center gap-3">
                      <span className="hidden md:inline-flex px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-500 uppercase tracking-tight">UI Bug</span>
                      <span className="material-symbols-outlined text-slate-400 text-sm">schedule</span>
                      <p className="text-slate-400 text-xs w-16">Today</p>
                    </div>
                  </div>
                  {/* Issue Row 2 */}
                  <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 transition-colors cursor-pointer group">
                    <span className="material-symbols-outlined text-blue-500 text-lg">check_circle</span>
                    <span className="text-slate-400 text-xs font-mono w-16">ACM-098</span>
                    <p className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200 truncate">Refactor data fetching hooks for performance</p>
                    <div className="flex items-center gap-3">
                      <span className="hidden md:inline-flex px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-500 uppercase tracking-tight">Refactor</span>
                      <span className="material-symbols-outlined text-slate-400 text-sm">schedule</span>
                      <p className="text-slate-400 text-xs w-16">Oct 24</p>
                    </div>
                  </div>
                  {/* Issue Row 3 */}
                  <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 transition-colors cursor-pointer group">
                    <span className="material-symbols-outlined text-slate-400 text-lg">radio_button_unchecked</span>
                    <span className="text-slate-400 text-xs font-mono w-16">ACM-087</span>
                    <p className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200 truncate">Create style guide for documentation site</p>
                    <div className="flex items-center gap-3">
                      <span className="hidden md:inline-flex px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-500 uppercase tracking-tight">Design</span>
                      <span className="material-symbols-outlined text-slate-400 text-sm">schedule</span>
                      <p className="text-slate-400 text-xs w-16">Oct 21</p>
                    </div>
                  </div>
                  {/* Issue Row 4 */}
                  <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <span className="material-symbols-outlined text-[#126ede] text-lg">sync</span>
                    <span className="text-slate-400 text-xs font-mono w-16">ACM-074</span>
                    <p className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200 truncate">Improve onboarding flow for new users</p>
                    <div className="flex items-center gap-3">
                      <span className="hidden md:inline-flex px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-500 uppercase tracking-tight">Enhancement</span>
                      <span className="material-symbols-outlined text-slate-400 text-sm">schedule</span>
                      <p className="text-slate-400 text-xs w-16">Oct 19</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Activity Feed */}
            <aside className="w-full md:w-80 flex flex-col gap-6">
              <div>
                <h3 className="text-slate-900 dark:text-slate-100 text-lg font-semibold tracking-tight mb-4">Activity</h3>
                <div className="flex flex-col gap-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200 dark:before:bg-slate-800">
                  {/* Activity Item 1 */}
                  <div className="relative flex gap-4">
                    <div className="mt-1 size-[22px] rounded-full bg-white dark:bg-slate-900 border-2 border-[#126ede] z-10"></div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        <span className="font-bold text-slate-900 dark:text-slate-100">Sarah Chen</span> moved <span className="font-medium text-[#126ede]">ACM-44</span> to <span className="italic">Ready for Review</span>
                      </p>
                      <span className="text-[10px] text-slate-400">12 minutes ago</span>
                    </div>
                  </div>
                  {/* Activity Item 2 */}
                  <div className="relative flex gap-4">
                    <div className="mt-1 size-[22px] rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 z-10"></div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        <span className="font-bold text-slate-900 dark:text-slate-100">David Miller</span> commented on <span className="font-medium text-[#126ede]">ACM-102</span>
                      </p>
                      <div className="bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg text-xs italic text-slate-500">
                        "I think we can solve this by adjusting the z-index on the..."
                      </div>
                      <span className="text-[10px] text-slate-400">1 hour ago</span>
                    </div>
                  </div>
                  {/* Activity Item 3 */}
                  <div className="relative flex gap-4">
                    <div className="mt-1 size-[22px] rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 z-10"></div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        <span className="font-bold text-slate-900 dark:text-slate-100">Marcus Wright</span> created a new project: <span className="font-medium text-slate-900 dark:text-slate-100">Design System Audit</span>
                      </p>
                      <span className="text-[10px] text-slate-400">4 hours ago</span>
                    </div>
                  </div>
                  {/* Activity Item 4 */}
                  <div className="relative flex gap-4">
                    <div className="mt-1 size-[22px] rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 z-10"></div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        <span className="font-bold text-slate-900 dark:text-slate-100">Alice Smith</span> assigned <span className="font-medium text-[#126ede]">ACM-87</span> to you
                      </p>
                      <span className="text-[10px] text-slate-400">Yesterday</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Subtle Help/Stats Section */}
              <div className="bg-[#126ede]/5 dark:bg-[#126ede]/10 rounded-xl p-4 border border-[#126ede]/10">
                <h4 className="text-[#126ede] text-xs font-bold uppercase tracking-widest mb-2">Weekly Summary</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 dark:text-slate-400">Closed Issues</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 dark:text-slate-400">In Progress</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">4</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-1">
                    <div className="bg-[#126ede] h-1.5 rounded-full w-[75%]"></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">You're doing 15% better than last week.</p>
                </div>
              </div>
            </aside>
          </main>
          {/* Bottom Navigation (Mobile Only) */}
          <footer className="md:hidden flex border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pb-2 pt-2 sticky bottom-0">
            <a className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#126ede]" href="#">
              <span className="material-symbols-outlined">home</span>
              <span className="text-[10px] font-medium">Home</span>
            </a>
            <a className="flex flex-1 flex-col items-center justify-center gap-0.5 text-slate-500" href="#">
              <span className="material-symbols-outlined">check_circle</span>
              <span className="text-[10px] font-medium">My Issues</span>
            </a>
            <a className="flex flex-1 flex-col items-center justify-center gap-0.5 text-slate-500" href="#">
              <span className="material-symbols-outlined">grid_view</span>
              <span className="text-[10px] font-medium">Projects</span>
            </a>
            <a className="flex flex-1 flex-col items-center justify-center gap-0.5 text-slate-500" href="#">
              <span className="material-symbols-outlined">search</span>
              <span className="text-[10px] font-medium">Search</span>
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}