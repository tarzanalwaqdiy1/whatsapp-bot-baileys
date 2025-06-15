const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const fs = require('fs');
const { Boom } = require('@hapi/boom');

// جلسة
const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function startBot() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.key.fromMe && msg.message) {
            const sender = msg.key.remoteJid;
            console.log("📥 رسالة من:", sender);
            await sock.sendMessage(sender, { text: "🤖 MALVIN-XD Bot يعمل من GitHub Actions!" });
        }
    });

    sock.ev.on('creds.update', saveState);
}

startBot();

// لا تجعل العملية تغلق
setInterval(() => {}, 1 << 30);
