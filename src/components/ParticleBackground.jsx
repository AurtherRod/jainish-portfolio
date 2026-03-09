import React, { useEffect, useRef, useState } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const [isLowPerformance, setIsLowPerformance] = useState(false);

    useEffect(() => {
        // Detect low-performance devices
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        setIsLowPerformance(isMobile || hasLowMemory);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        let animationFrameId;
        let particles = [];
        let lastTime = 0;
        const fps = 30; // Limit to 30 FPS for better performance
        const fpsInterval = 1000 / fps;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.3 - 0.15;
                this.speedY = Math.random() * 0.3 - 0.15;
                this.color = this.getRandomColor();
                this.opacity = Math.random() * 0.4 + 0.2;
            }

            getRandomColor() {
                const colors = [
                    'rgba(139, 92, 246,', // purple
                    'rgba(236, 72, 153,', // pink
                    'rgba(6, 182, 212,',  // cyan
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around screen edges
                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `${this.color} ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        const init = () => {
            particles = [];
            // Reduce particle count on low-performance devices
            const baseCount = isLowPerformance ? 30 : 50;
            const numberOfParticles = Math.min(
                baseCount,
                Math.floor((canvas.width * canvas.height) / 20000)
            );

            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        // Optimized connection algorithm with spatial partitioning
        const connectParticles = () => {
            const connectionDistance = 120;
            const maxConnections = 3; // Limit connections per particle

            for (let i = 0; i < particles.length; i++) {
                let connections = 0;

                // Only check nearby particles (optimization)
                for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;

                    // Quick distance check before expensive sqrt
                    const distanceSquared = dx * dx + dy * dy;
                    if (distanceSquared < connectionDistance * connectionDistance) {
                        const distance = Math.sqrt(distanceSquared);

                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / connectionDistance)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        connections++;
                    }
                }
            }
        };

        const animate = (currentTime) => {
            animationFrameId = requestAnimationFrame(animate);

            // Throttle to target FPS
            const elapsed = currentTime - lastTime;
            if (elapsed < fpsInterval) return;
            lastTime = currentTime - (elapsed % fpsInterval);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Skip connections on low-performance devices
            if (!isLowPerformance) {
                connectParticles();
            }
        };

        // Resize handler
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init(); // Reinitialize particles on resize
        };

        // Initialize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animate(0);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isLowPerformance]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
            style={{ opacity: 0.4 }}
            aria-hidden="true"
        />
    );
};

export default ParticleBackground;
