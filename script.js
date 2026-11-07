// Minimalist elegant background with subtle animations
        const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');
        let width, height;
        let dots = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = document.documentElement.scrollHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        // Create subtle background dots
        const dotCount = Math.min(80, Math.floor(window.innerWidth * 0.06));
        for (let i = 0; i < dotCount; i++) {
            dots.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.15 + 0.05
            });
        }

        function animateDots() {
            ctx.clearRect(0, 0, width, height);

            dots.forEach(d => {
                d.x += d.speedX;
                d.y += d.speedY;

                if (d.x < 0 || d.x > width) d.speedX *= -1;
                if (d.y < 0 || d.y > height) d.speedY *= -1;

                ctx.beginPath();
                ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(139, 115, 85, ${d.opacity})`;
                ctx.fill();
            });

            // Draw subtle connections
            for (let i = 0; i < dots.length; i++) {
                for (let j = i + 1; j < dots.length; j++) {
                    const dx = dots[i].x - dots[j].x;
                    const dy = dots[i].y - dots[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(dots[i].x, dots[i].y);
                        ctx.lineTo(dots[j].x, dots[j].y);
                        ctx.strokeStyle = `rgba(139, 115, 85, ${0.04 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateDots);
        }

        animateDots();

        // Header scroll effect
        const header = document.getElementById('header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        });

        // Smooth section reveal
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });

        // Trigger initial animations
        setTimeout(() => {
            document.querySelectorAll('section').forEach(section => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
        }, 200);

        console.log('✨ Elegant Portfolio Loaded');
