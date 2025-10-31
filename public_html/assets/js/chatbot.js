// Chatbot de Atendimento
class BarberChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.currentStep = 'greeting';
        this.userData = {};
        this.availableSlots = this.generateAvailableSlots();
        this.init();
    }

    init() {
        this.createChatbot();
        this.bindEvents();
        this.loadMessages();
    }

    createChatbot() {
        // Create chatbot container
        const chatbotHTML = `
            <div id="chatbot-container" class="chatbot-container">
                <div id="chatbot-toggle" class="chatbot-toggle">
                    <svg class="chatbot-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                    <span class="chatbot-badge">1</span>
                </div>
                
                <div id="chatbot-window" class="chatbot-window hidden">
                    <div class="chatbot-header">
                        <div class="chatbot-title">
                            <div class="chatbot-avatar">✂️</div>
                            <div>
                                <h3>BarberPro Assistente</h3>
                                <p class="chatbot-status">Online agora</p>
                            </div>
                        </div>
                        <button id="chatbot-close" class="chatbot-close">×</button>
                    </div>
                    
                    <div id="chatbot-messages" class="chatbot-messages">
                        <div class="chatbot-message bot-message">
                            <div class="message-content">
                                <p>Olá! 👋 Bem-vindo à nossa barbearia!</p>
                                <p>Como posso ajudá-lo hoje?</p>
                            </div>
                            <div class="message-time">Agora</div>
                        </div>
                    </div>
                    
                    <div class="chatbot-actions">
                        <button class="chatbot-action-btn" data-action="schedule">📅 Ver Horários</button>
                        <button class="chatbot-action-btn" data-action="services">💇 Serviços</button>
                        <button class="chatbot-action-btn" data-action="contact">📞 Contato</button>
                    </div>
                    
                    <div class="chatbot-input-container">
                        <input type="text" id="chatbot-input" placeholder="Digite sua mensagem..." />
                        <button id="chatbot-send">➤</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    bindEvents() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const send = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const actions = document.querySelectorAll('.chatbot-action-btn');

        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.closeChat());
        send.addEventListener('click', () => this.sendMessage());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        actions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleAction(action);
            });
        });
    }

    toggleChat() {
        const window = document.getElementById('chatbot-window');
        const toggle = document.getElementById('chatbot-toggle');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            window.classList.remove('hidden');
            toggle.classList.add('active');
            document.getElementById('chatbot-input').focus();
        } else {
            window.classList.add('hidden');
            toggle.classList.remove('active');
        }
    }

    closeChat() {
        const window = document.getElementById('chatbot-window');
        const toggle = document.getElementById('chatbot-toggle');
        
        this.isOpen = false;
        window.classList.add('hidden');
        toggle.classList.remove('active');
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            input.value = '';
            this.processMessage(message);
        }
    }

    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
            </div>
            <div class="message-time">${time}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.messages.push({ content, sender, time });
    }

    addBotMessage(content, options = []) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message bot-message';
        
        const time = new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        let optionsHTML = '';
        if (options.length > 0) {
            optionsHTML = '<div class="message-options">' + 
                options.map(option => 
                    `<button class="option-btn" data-value="${option.value}">${option.text}</button>`
                ).join('') + 
                '</div>';
        }
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
                ${optionsHTML}
            </div>
            <div class="message-time">${time}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Bind option buttons
        if (options.length > 0) {
            messageDiv.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const value = e.target.dataset.value;
                    this.addMessage(e.target.textContent, 'user');
                    this.handleOptionClick(value);
                });
            });
        }
        
        this.messages.push({ content, sender: 'bot', time });
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simulate typing delay
        setTimeout(() => {
            if (lowerMessage.includes('horário') || lowerMessage.includes('agendar') || lowerMessage.includes('disponível')) {
                this.showAvailableSlots();
            } else if (lowerMessage.includes('serviço') || lowerMessage.includes('preço') || lowerMessage.includes('corte')) {
                this.showServices();
            } else if (lowerMessage.includes('contato') || lowerMessage.includes('telefone') || lowerMessage.includes('endereço')) {
                this.showContact();
            } else if (lowerMessage.includes('obrigado') || lowerMessage.includes('tchau') || lowerMessage.includes('até logo')) {
                this.addBotMessage('De nada! Foi um prazer ajudá-lo! 😊\n\nSe precisar de mais alguma coisa, estarei aqui!');
            } else {
                this.addBotMessage('Entendi! Como posso ajudá-lo melhor?', [
                    { value: 'schedule', text: '📅 Ver horários disponíveis' },
                    { value: 'services', text: '💇 Conhecer nossos serviços' },
                    { value: 'contact', text: '📞 Informações de contato' }
                ]);
            }
        }, 1000);
    }

    handleAction(action) {
        switch (action) {
            case 'schedule':
                this.showAvailableSlots();
                break;
            case 'services':
                this.showServices();
                break;
            case 'contact':
                this.showContact();
                break;
        }
    }

    handleOptionClick(value) {
        setTimeout(() => {
            switch (value) {
                case 'schedule':
                    this.showAvailableSlots();
                    break;
                case 'services':
                    this.showServices();
                    break;
                case 'contact':
                    this.showContact();
                    break;
                case 'book':
                    this.startBooking();
                    break;
            }
        }, 500);
    }

    showAvailableSlots() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const todayStr = today.toLocaleDateString('pt-BR');
        const tomorrowStr = tomorrow.toLocaleDateString('pt-BR');
        
        let message = `📅 **Horários Disponíveis:**\n\n`;
        message += `**Hoje (${todayStr}):**\n`;
        message += `• 09:00 - 10:30 ✅\n`;
        message += `• 11:00 - 12:30 ✅\n`;
        message += `• 14:00 - 15:30 ✅\n`;
        message += `• 16:00 - 17:30 ✅\n\n`;
        
        message += `**Amanhã (${tomorrowStr}):**\n`;
        message += `• 08:00 - 09:30 ✅\n`;
        message += `• 10:00 - 11:30 ✅\n`;
        message += `• 13:00 - 14:30 ✅\n`;
        message += `• 15:00 - 16:30 ✅\n`;
        message += `• 17:00 - 18:30 ✅\n\n`;
        
        message += `💡 *Cada atendimento dura aproximadamente 1h30min*`;
        
        this.addBotMessage(message, [
            { value: 'book', text: '📝 Quero agendar!' },
            { value: 'services', text: '💇 Ver serviços' }
        ]);
    }

    showServices() {
        const message = `💇 **Nossos Serviços:**\n\n` +
            `✂️ **Corte de Cabelo** - R$ 60\n` +
            `• Degradê, Social, Militar\n\n` +
            `🧔 **Barba & Bigode** - R$ 40\n` +
            `• Aparação, Modelagem\n\n` +
            `🪒 **Barbear Tradicional** - R$ 50\n` +
            `• Navalha, Toalha quente\n\n` +
            `🎯 **Combo Completo** - R$ 90\n` +
            `• Corte + Barba + Barbear\n\n` +
            `💡 *Todos os serviços incluem: shampoo, condicionador e finalização*`;
        
        this.addBotMessage(message, [
            { value: 'schedule', text: '📅 Ver horários' },
            { value: 'book', text: '📝 Quero agendar!' }
        ]);
    }

    showContact() {
        const message = `📞 **Informações de Contato:**\n\n` +
            `📍 **Endereço:**\n` +
            `Rua das Tesouras, 123 - Centro\n\n` +
            `📱 **Telefone/WhatsApp:**\n` +
            `(11) 99999-9999\n\n` +
            `📧 **E-mail:**\n` +
            `contato@barberpro.com\n\n` +
            `🕒 **Horário de Funcionamento:**\n` +
            `Segunda a Sexta: 8h às 18h\n` +
            `Sábado: 8h às 16h\n` +
            `Domingo: Fechado\n\n` +
            `🌐 **Redes Sociais:**\n` +
            `@barbearia_pro (Instagram)\n` +
            `Barbearia Pro (Facebook)`;
        
        this.addBotMessage(message, [
            { value: 'schedule', text: '📅 Ver horários' },
            { value: 'book', text: '📝 Quero agendar!' }
        ]);
    }

    startBooking() {
        this.addBotMessage('Perfeito! Vamos agendar seu horário! 🎉\n\nQual é o seu nome?');
        this.currentStep = 'getting_name';
    }

    generateAvailableSlots() {
        const slots = [];
        const today = new Date();
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() + i);
            
            const daySlots = [];
            const startHour = 8;
            const endHour = 18;
            
            for (let hour = startHour; hour < endHour; hour += 2) {
                if (Math.random() > 0.3) { // 70% chance of being available
                    daySlots.push({
                        time: `${hour.toString().padStart(2, '0')}:00`,
                        available: true
                    });
                }
            }
            
            slots.push({
                date: date.toLocaleDateString('pt-BR'),
                slots: daySlots
            });
        }
        
        return slots;
    }

    loadMessages() {
        // Load any saved messages from localStorage
        const saved = localStorage.getItem('chatbot-messages');
        if (saved) {
            this.messages = JSON.parse(saved);
        }
    }

    saveMessages() {
        localStorage.setItem('chatbot-messages', JSON.stringify(this.messages));
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', function() {
    new BarberChatbot();
});

