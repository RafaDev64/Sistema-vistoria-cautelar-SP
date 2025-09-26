  // Tema Management
        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);
        }

        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        }

        function updateThemeIcon(theme) {
            const icon = document.getElementById('theme-icon');
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }

        // Alert System
        function showAlert(message, type = 'error') {
            const alertContainer = document.getElementById('alert-container');
            alertContainer.innerHTML = `
                <div class="alert alert-${type}">
                    ${message}
                </div>
            `;
            
            setTimeout(() => {
                alertContainer.innerHTML = '';
            }, 5000);
        }

        // Demo Users Data
        const demoUsers = {
            'admin@vistoria.com': {
                password: 'admin123',
                profile: 'admin',
                name: 'Administrador Sistema'
            },
            'gestor@vistoria.com': {
                password: 'gestor123',
                profile: 'gestor',
                name: 'João Silva'
            },
            'vistoriador@vistoria.com': {
                password: 'vistoriador123',
                profile: 'vistoriador',
                name: 'Maria Santos'
            }
        };

        // Authentication
        function authenticate(email, password) {
            const user = demoUsers[email];
            
            if (!user || user.password !== password) {
                return { success: false, message: 'E-mail ou senha incorretos.' };
            }

            // Store user session
            const sessionData = {
                email: email,
                profile: user.profile,
                name: user.name,
                loginTime: new Date().toISOString()
            };

            localStorage.setItem('userSession', JSON.stringify(sessionData));
            
            return { 
                success: true, 
                profile: user.profile,
                message: 'Login realizado com sucesso!' 
            };
        }

        // Form Submission
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const loginBtn = document.getElementById('loginBtn');
            
            // Disable button during authentication
            loginBtn.disabled = true;
            loginBtn.textContent = 'Entrando...';
            
            // Simulate network delay
            setTimeout(() => {
                const result = authenticate(email, password);
                
                if (result.success) {
                    showAlert(result.message, 'success');
                    
                    // Redirect after successful login
                    setTimeout(() => {
                        // In a real app, this would redirect to dashboard.html
                        // For demo, we'll show a success message
                        showAlert('Redirecionando para o dashboard...', 'success');
                        console.log(`Redirecionando usuário ${result.profile} para dashboard`);
                        
                        // Simulate redirect
                        setTimeout(() => {
                            window.location.href = 'dashboard.html'; // Would be dashboard.html
                        }, 1500);
                    }, 1000);
                } else {
                    showAlert(result.message, 'error');
                }
                
                // Re-enable button
                loginBtn.disabled = false;
                loginBtn.textContent = 'Entrar';
            }, 1000);
        });

        // Auto-fill demo credentials on click
        document.querySelectorAll('.credential-item').forEach(item => {
            item.addEventListener('click', function() {
                const text = this.textContent;
                if (text.includes('admin@')) {
                    document.getElementById('email').value = 'admin@vistoria.com';
                    document.getElementById('password').value = 'admin123';
                } else if (text.includes('gestor@')) {
                    document.getElementById('email').value = 'gestor@vistoria.com';
                    document.getElementById('password').value = 'gestor123';
                } else if (text.includes('vistoriador@')) {
                    document.getElementById('email').value = 'vistoriador@vistoria.com';
                    document.getElementById('password').value = 'vistoriador123';
                }
            });
        });

        // Initialize theme on page load
        initTheme();

        // Check if user is already logged in
        const existingSession = localStorage.getItem('userSession');
        if (existingSession) {
            const session = JSON.parse(existingSession);
            showAlert(`Você já está logado como ${session.name}. Redirecionando...`, 'success');
            setTimeout(() => {
                console.log('Redirecionando usuário já logado');
                window.location.href = 'dashboard.html';
            }, 2000);
        }