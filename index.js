const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');

// ملف تخزين الجلسة
const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function startBot() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true // ✅ يعرض كود QR في اللوج
    });

    // الاستماع للرسائل
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.key.fromMe && msg.message) {
            const sender = msg.key.remoteJid;
            console.log("📥 رسالة من:", sender);
            await sock.sendMessage(sender, { text: "🤖 أهلاً! أنا بوت واتساب أعمل من GitHub Actions!" });
        }
    });

    sock.ev.on('creds.update', saveState);
}

startBot();

// يمنع الخروج التلقائي
setInterval(() => {}, 1 << 30);