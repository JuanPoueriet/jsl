import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-white">Dashboard</h1>
        <div class="flex gap-2">
            <button (click)="loadData()" class="px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors">Refresh</button>
            <button (click)="saveData()" [disabled]="saving" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2">
                <span *ngIf="saving" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
        </div>
      </div>

      <div *ngIf="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p class="mt-2 text-gray-400">Loading content...</p>
      </div>

      <div *ngIf="error" class="p-4 bg-red-900/50 border border-red-800 rounded text-red-200 mb-4">
        {{ error }}
      </div>

      <div *ngIf="!loading && objectKeys(jsonDrafts).length > 0" class="bg-gray-900 rounded-lg border border-gray-800 flex flex-col h-[calc(100vh-200px)]">
        <!-- Tabs -->
        <div class="flex overflow-x-auto border-b border-gray-800 bg-gray-800/50 scrollbar-thin scrollbar-thumb-gray-700">
          <button
            *ngFor="let key of objectKeys(jsonDrafts)"
            (click)="activeTab = key"
            [class.bg-gray-900]="activeTab === key"
            [class.text-blue-400]="activeTab === key"
            [class.border-t-2]="activeTab === key"
            [class.border-blue-400]="activeTab === key"
            class="px-4 py-3 text-sm font-medium text-gray-400 hover:text-white whitespace-nowrap transition-colors border-t-2 border-transparent"
          >
            {{ formatKey(key) }}
          </button>
        </div>

        <!-- Editor -->
        <div class="flex-1 relative">
          <div class="absolute top-0 right-0 p-2 text-xs text-gray-500 bg-gray-900/80 rounded-bl z-10 pointer-events-none">
             JSON Editor
          </div>
          <textarea
            [(ngModel)]="jsonDrafts[activeTab]"
            class="w-full h-full bg-gray-950 text-gray-300 font-mono text-sm p-4 focus:outline-none resize-none"
            spellcheck="false"
            placeholder="JSON content..."
          ></textarea>
        </div>
      </div>

      <div *ngIf="!loading && objectKeys(jsonDrafts).length === 0" class="text-center py-12 text-gray-500">
        No content found to edit.
      </div>
    </div>
  `,
  styles: [`
    .scrollbar-thin::-webkit-scrollbar {
      height: 6px;
    }
    .scrollbar-thin::-webkit-scrollbar-track {
      background: transparent;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background-color: #374151;
      border-radius: 3px;
    }
  `]
})
export class Dashboard implements OnInit {
  private http = inject(HttpClient);

  loading = true;
  saving = false;
  error = '';
  activeTab = '';

  // Maps key -> JSON string for editing
  jsonDrafts: { [key: string]: string } = {};

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.error = '';
    this.http.get<any>('/api/content').subscribe({
      next: (res) => {
        this.loading = false;
        // Init drafts
        this.jsonDrafts = {};
        if (res) {
          Object.keys(res).forEach(key => {
            this.jsonDrafts[key] = JSON.stringify(res[key], null, 2);
          });

          // Set active tab if not set or invalid
          if (!this.activeTab || !this.jsonDrafts[this.activeTab]) {
            const keys = Object.keys(this.jsonDrafts);
            if (keys.length > 0) {
              this.activeTab = keys[0];
            }
          }
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load content. Ensure the server is running (SSR mode) or backend is reachable.';
        console.error(err);
      }
    });
  }

  saveData() {
    this.saving = true;
    this.error = '';

    // Validate and construct payload
    const payload: any = {};
    try {
        Object.keys(this.jsonDrafts).forEach(key => {
            payload[key] = JSON.parse(this.jsonDrafts[key]);
        });
    } catch (e) {
        this.saving = false;
        this.error = 'Invalid JSON detected. Please check your syntax.';
        alert('Invalid JSON in one of the tabs. Please correct it before saving.');
        return;
    }

    const token = localStorage.getItem('jsl_admin_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('/api/content', payload, { headers }).subscribe({
      next: () => {
        this.saving = false;
        alert('Changes saved successfully!');
      },
      error: (err) => {
        this.saving = false;
        this.error = 'Failed to save changes. ' + (err.error?.error || err.message);
      }
    });
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  formatKey(key: string): string {
    return key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  }
}
