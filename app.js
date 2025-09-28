# PowerShell mein
echo "const { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const config = require('./config');
const fs = require('fs');

console.log(`
╔══════════════════════════════════╗
║      🚀 𝚻𝚮𝚵 𝐁𝐎𝐓 𝐒𝐓𝐀𝐑𝐓𝐈𝐍𝐆...     ║
║      ✨ 𝚴𝚯𝚻 𝐔𝚪 𝚴𝚰𝐋 🔥         ║
╚══════════════════════════════════╝
`);

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
    const { version } = await fetchLatestBaileysVersion();
    
    const sock = makeWASocket({
        version: version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state,
        browser: ['THE NILOOO BOT', 'Safari', '1.0.0']
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('\n📱 𝚂𝙲𝙰𝙽 𝚃𝙷𝙸𝚂 𝚀𝚁 𝚆𝙸𝚃𝙷 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿:');
            console.log('╔══════════════════════════════════╗');
            qrcode.generate(qr, { small: true });
            console.log('╚══════════════════════════════════╝');
            console.log('📸 Go to WhatsApp → Linked Devices → Scan QR Code\n');
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('🔌 Connection closed...', shouldReconnect ? 'Reconnecting...' : 'Please restart bot');
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('✅ 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝙲𝙾𝙽𝙽𝙴𝙲𝚃𝙴𝙳 𝚂𝚄𝙲𝙲𝙴𝚂𝚂𝙵𝚄𝙻𝙻𝚈!');
            console.log('🤖 𝚻𝚮𝚵 𝐁𝐎𝐓 𝙸𝚂 𝙽𝙾𝚆 𝚁𝙴𝙰𝙳𝚈 𝚃𝙾 𝚄𝚂𝙴!');
        }
    });

    sock.ev.on('creds.update', saveCreds);
    
    return sock;
}

// Start the bot
connectToWhatsApp().catch(err => {
    console.log('❌ Connection error:', err);
    console.log('🔄 Restarting in 5 seconds...');
    setTimeout(() => connectToWhatsApp(), 5000);
});" > app.js
