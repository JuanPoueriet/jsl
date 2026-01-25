import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-900 text-white flex">
      <aside class="w-64 bg-gray-800 p-6 flex flex-col border-r border-gray-700">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-blue-400">JSL Admin</h2>
          <p class="text-xs text-gray-400 mt-1">Content Management</p>
        </div>

        <nav class="flex-1 space-y-2">
          <a routerLink="/admin/dashboard" routerLinkActive="bg-gray-700 text-white" class="block py-2 px-4 rounded hover:bg-gray-700 text-gray-300 transition-colors">
            Dashboard
          </a>
          <div class="h-px bg-gray-700 my-4"></div>
          <a routerLink="/" target="_blank" class="block py-2 px-4 rounded hover:bg-gray-700 text-gray-400 transition-colors flex items-center gap-2">
            <span>View Site</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </nav>

        <button (click)="logout()" class="mt-auto py-2 px-4 bg-red-900/50 text-red-200 border border-red-800 rounded hover:bg-red-900 transition-colors w-full text-left flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Logout
        </button>
      </aside>
      <main class="flex-1 p-8 overflow-auto bg-gray-950">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AdminLayout {
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jsl_admin_token');
      window.location.href = '/admin/login';
    }
  }
}
