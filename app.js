const { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const config = require('./config');
const fs = require('fs');

console.log(`
╔══════════════════════════════════════════════════╗
║              🚀 𝚻𝚮𝚵 𝐁𝐎𝐓 𝐒𝐓𝐀𝐑𝐓𝐈𝐍𝐆...              ║
║              ✨ 𝚴𝚯𝚻 𝐔𝚪 𝚴𝚰𝐋 🔥                   ║
║         🤖 Advanced WhatsApp Multi-Device        ║
╚══════════════════════════════════════════════════╝
`);

// Create necessary folders
if (!fs.existsSync('./auth_info')) {
    fs.mkdirSync('./auth_info');
}
if (!fs.existsSync('./database.db')) {
    fs.writeFileSync('./database.db', '');
}

async function connectToWhatsApp() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
        const { version } = await fetchLatestBaileysVersion();
        
        const sock = makeWASocket({
            version: version,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: false,
            auth: state,
            browser: ['𝚻𝚮𝚵 𝐁𝐎𝐓', 'Chrome', '3.0'],
            markOnlineOnConnect: true,
            generateHighQualityLinkPreview: true,
            syncFullHistory: false,
            defaultQueryTimeoutMs: 60000
        });

        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;
            
            if (qr) {
                console.log('\n📱 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝚀𝚁 𝙲𝙾𝙳𝙴 𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴𝙳:');
                console.log('╔══════════════════════════════════════════════════╗');
                qrcode.generate(qr, { small: true });
                console.log('╚══════════════════════════════════════════════════╝');
                console.log('\n📸 𝙸𝙽𝚂𝚃𝚁𝚄𝙲𝚃𝙸𝙾𝙽𝚂:');
                console.log('1. WhatsApp kholen');
                console.log('2. Settings → Linked Devices → Link a Device');
                console.log('3. QR code scan karen\n');
            }

            if (connection === 'close') {
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log('🔌 Connection closed...', shouldReconnect ? 'Reconnecting...' : 'Please restart bot');
                if (shouldReconnect) {
                    setTimeout(() => connectToWhatsApp(), 5000);
                }
            } else if (connection === 'open') {
                console.log('\n✅ 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝙲𝙾𝙽𝙽𝙴𝙲𝚃𝙴𝙳 𝚂𝚄𝙲𝙲𝙴𝚂𝚂𝙵𝚄𝙻𝙻𝚈!');
                console.log('🤖 𝚻𝚮𝚵 𝐁𝐎𝐓 𝙽𝙾𝚆 𝚁𝙴𝙰𝙳𝚈 𝚃𝙾 𝚄𝚂𝙴!');
                console.log('⭐ 𝙱𝚈: 𝚴𝚯𝚻 𝐔𝚪 𝚴𝚰𝐋');
                console.log('📞 𝚂𝚄𝙿𝙿𝙾𝚁𝚃: +92 347 4810818\n');
            }
        });

        sock.ev.on('creds.update', saveCreds);
        
        // Message events handle karenge
        sock.ev.on('messages.upsert', async (m) => {
            const msg = m.messages[0];
            if (!msg.message || msg.key.fromMe) return;
            
            console.log('📩 New message received from:', msg.pushName || 'Unknown');
        });

        return sock;
    } catch (error) {
        console.log('❌ Connection error:', error);
        console.log('🔄 Restarting in 10 seconds...');
        setTimeout(() => connectToWhatsApp(), 10000);
    }
}

// Graceful shutdown handling
process.on('SIGINT', () => {
    console.log('\n\n👋 𝚻𝚮𝚵 𝐁𝐎𝐓 𝚂𝚃𝙾𝙿𝙿𝙸𝙽𝙶...');
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    console.log('⚠️  Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('⚠️  Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start the bot
console.log('🔄 Initializing 𝚻𝚮𝚵 𝐁𝐎𝐃...');
connectToWhatsApp().catch(err => {
    console.log('❌ Failed to start bot:', err);
});
