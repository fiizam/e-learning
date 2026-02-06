<script setup>
import { ref } from 'vue';
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile } from 'lucide-vue-next';

useHead({
  title: 'Pesan Masuk - SMK 09 Learning Portal',
});

const activeChatId = ref(1);
const newMessage = ref('');

// --- DUMMY CHAT DATA ---
const contacts = ref([
  { id: 1, name: 'Pak Hendra, S.Kom', role: 'Guru TKJ', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hendra', time: '10:30', unread: 0, lastMsg: 'Jangan lupa kumpulkan tugas VLAN ya.' },
  { id: 2, name: 'Bu Siti Aminah', role: 'Wali Kelas', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti', time: 'Kemarin', unread: 2, lastMsg: 'Besok ada pertemuan orang tua.' },
  { id: 3, name: 'Rizky (Ketua Kelas)', role: 'Siswa', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rizky', time: 'Senin', unread: 0, lastMsg: 'Bro, ada info remedial gak?' },
]);

const chatHistory = ref([
  { id: 1, sender: 'other', text: 'Halo, bagaimana progress tugas akhirnya?', time: '10:00' },
  { id: 2, sender: 'me', text: 'Halo Pak, sudah sampai tahap konfigurasi Routing.', time: '10:05' },
  { id: 3, sender: 'me', text: 'Tapi saya ada kendala di bagian DHCP Relay.', time: '10:06' },
  { id: 4, sender: 'other', text: 'Oke, coba cek IP Helper Address nya.', time: '10:15' },
  { id: 5, sender: 'other', text: 'Jangan lupa kumpulkan tugas VLAN ya.', time: '10:30' },
]);

const activeContact = ref(contacts.value[0]);

const selectContact = (contact) => {
  activeChatId.value = contact.id;
  activeContact.value = contact;
  // Reset unread logic here
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  chatHistory.value.push({
    id: Date.now(),
    sender: 'me',
    text: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  newMessage.value = '';
  // Auto scroll logic would go here
};
</script>

<template>
  <div class="h-[calc(100vh-140px)] bg-white border border-slate-200 rounded-2xl overflow-hidden flex shadow-sm">
    
    <div class="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50" 
         :class="activeChatId ? 'hidden md:flex' : 'flex'">
      
      <div class="p-4 border-b border-slate-200 bg-white">
        <h2 class="font-bold text-slate-800 text-lg mb-4">Pesan</h2>
        <div class="relative">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Cari percakapan..." class="w-full bg-slate-100 border-none rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
      </div>

      <div class="flex-1 overflow-y-auto custom-scrollbar">
        <div v-for="contact in contacts" :key="contact.id"
             @click="selectContact(contact)"
             class="flex items-center gap-3 p-4 hover:bg-white hover:shadow-sm cursor-pointer transition-all border-b border-slate-100 last:border-0"
             :class="activeChatId === contact.id ? 'bg-white border-l-4 border-l-indigo-600 shadow-sm' : 'border-l-4 border-l-transparent'">
          
          <img :src="contact.avatar" class="w-10 h-10 rounded-full bg-slate-200" />
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline mb-0.5">
              <h4 class="font-bold text-slate-700 text-sm truncate">{{ contact.name }}</h4>
              <span class="text-[10px] text-slate-400 font-medium">{{ contact.time }}</span>
            </div>
            <p class="text-xs text-slate-500 truncate" :class="contact.unread > 0 ? 'font-bold text-slate-800' : ''">
              {{ contact.lastMsg }}
            </p>
          </div>
          <div v-if="contact.unread > 0" class="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
            {{ contact.unread }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 flex flex-col bg-white" :class="!activeChatId ? 'hidden md:flex' : 'flex'">
      
      <div class="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-white shrink-0">
        <div class="flex items-center gap-3">
          <button @click="activeChatId = null" class="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <img :src="activeContact.avatar" class="w-9 h-9 rounded-full bg-slate-100" />
          <div>
            <h3 class="font-bold text-slate-800 text-sm">{{ activeContact.name }}</h3>
            <p class="text-[10px] text-green-600 font-bold flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
            </p>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <button class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition"><Phone :size="18" /></button>
          <button class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition"><Video :size="18" /></button>
          <button class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition"><MoreVertical :size="18" /></button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 custom-scrollbar">
        <div v-for="chat in chatHistory" :key="chat.id" class="flex flex-col" :class="chat.sender === 'me' ? 'items-end' : 'items-start'">
          <div class="max-w-[80%] rounded-2xl px-5 py-3 text-sm shadow-sm relative group"
               :class="chat.sender === 'me' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'">
            {{ chat.text }}
            <span class="text-[9px] absolute bottom-1 right-2 opacity-60 font-medium" :class="chat.sender === 'me' ? 'text-indigo-100' : 'text-slate-400'">{{ chat.time }}</span>
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-slate-200 bg-white">
        <div class="flex items-center gap-2 bg-slate-100 p-2 rounded-xl">
          <button class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition"><Paperclip :size="20" /></button>
          <input 
            v-model="newMessage"
            @keyup.enter="sendMessage"
            type="text" 
            placeholder="Tulis pesan..." 
            class="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
          />
          <button class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition"><Smile :size="20" /></button>
          <button @click="sendMessage" class="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md">
            <Send :size="18" />
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
</style>