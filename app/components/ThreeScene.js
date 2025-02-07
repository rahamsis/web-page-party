'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// const ThreeScene = () => {
//     const mountRef = useRef(null);
//     const speed = 4;
//     const trailLength = 5;

//     useEffect(() => {
//         let scene, camera, renderer, stars, starGeo;

//         function init() {
//             scene = new THREE.Scene();

//             camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
//             camera.position.z = 1;
//             camera.rotation.x = Math.PI / 2;

//             renderer = new THREE.WebGLRenderer();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//             mountRef.current.appendChild(renderer.domElement);

//             const starVertices = [];
//             for (let i = 0; i < 8000; i++) {
//                 starVertices.push(
//                     Math.random() * 600 - 300,
//                     Math.random() * 600 - 300,
//                     Math.random() * 600 - 300
//                 );
//             }

//             starGeo = new THREE.BufferGeometry();
//             starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

//               const sprite = new THREE.TextureLoader().load('/images/star.png');
//               const starMaterial = new THREE.PointsMaterial({
//                 color: 0xaaaaaa,
//                 size: 0.7,
//                 map: sprite,
//                 blending: THREE.AdditiveBlending,
//                 depthTest: false,
//                 transparent: true
//               });

//               stars = new THREE.Points(starGeo, starMaterial);
//             scene.add(stars);

//             window.addEventListener("resize", onWindowResize, false);

//             animate();
//         }

//         function onWindowResize() {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//         }

//         function animate() {
//             const positions = starGeo.attributes.position.array;
//             for (let i = 0; i < positions.length; i += 3) {
//                 positions[i + 1] -= speed;
//                 // positions[i + 1] -= 0.1;
//                 if (positions[i + 1] < -200) {
//                     positions[i + 1] = 200;
//                 }
//             }
//             starGeo.attributes.position.needsUpdate = true;
//             stars.rotation.y += 0.002;

//             renderer.render(scene, camera);
//             requestAnimationFrame(animate);
//         }

//         init();

//         return () => {
//             mountRef.current.removeChild(renderer.domElement);
//         };
//     }, []);

//     return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
// };

const ThreeScene = () => {
    const mountRef = useRef(null);
    const LINE_COUNT = 1000;

    useEffect(() => {
        let scene, camera, renderer, pos, vel, geom, pa, va;

        function init() {
            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 500);
            camera.position.z = 200;

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            if (mountRef.current) {
                mountRef.current.appendChild(renderer.domElement);
            }
            // mountRef.current.appendChild(renderer.domElement);

            geom = new THREE.BufferGeometry();
            geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6 * LINE_COUNT), 3));
            geom.setAttribute('velocity', new THREE.BufferAttribute(new Float32Array(2 * LINE_COUNT), 1));

            // Crear atributo de color
            const colors = new Float32Array(6 * LINE_COUNT);
            geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            pos = geom.getAttribute('position');
            pa = pos.array;
            vel = geom.getAttribute('velocity');
            va = vel.array;
            const col = geom.getAttribute('color').array;

            for (let line_index = 0; line_index < LINE_COUNT; line_index++) {
                var x = Math.random() * 400 - 200;
                var y = Math.random() * 200 - 100;
                var z = Math.random() * 500 - 100;
                var xx = x;
                var yy = y;
                var zz = z;
                // line start
                pa[6 * line_index] = x;
                pa[6 * line_index + 1] = y;
                pa[6 * line_index + 2] = z;
                // line end
                pa[6 * line_index + 3] = xx;
                pa[6 * line_index + 4] = yy;
                pa[6 * line_index + 5] = zz;

                // Set colors: blue (0, 0, 1) at start, white (1, 1, 1) at middle, red (1, 0, 0) at end
                col[6 * line_index] = 0;
                col[6 * line_index + 1] = 0;
                col[6 * line_index + 2] = 1; // Blue
                
                col[6 * line_index + 3] = 0.98;
                col[6 * line_index + 4] = 0.52;
                col[6 * line_index + 5] = 0.61; // Red

                va[2 * line_index] = 0;
                va[2 * line_index + 1] = 0;
            }

            // Crear material con transparencia y grosor de línea ajustado
            let mat = new THREE.LineBasicMaterial({ 
                vertexColors: true, 
                transparent: true, 
                opacity: 0.5, // Ajustar la opacidad a 0.5 para semitransparencia
                linewidth: 50 // Ajustar el grosor de la línea
            });

            // let mat = new THREE.LineBasicMaterial({ color: 0xffffff });
            // let mat = new THREE.LineBasicMaterial({ vertexColors: true });
            let lines = new THREE.LineSegments(geom, mat);
            scene.add(lines);

            window.addEventListener('resize', onWindowResize, false);
            animate();
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            for (let line_index = 0; line_index < LINE_COUNT; line_index++) {
                va[2 * line_index] += 0.03;
                va[2 * line_index + 1] += 0.025;

                pa[6 * line_index + 2] += va[2 * line_index];
                pa[6 * line_index + 5] += va[2 * line_index + 1];

                if (pa[6 * line_index + 5] > 200) {
                    var z = Math.random() * 200 - 100;
                    pa[6 * line_index + 2] = z;
                    pa[6 * line_index + 5] = z;
                    va[2 * line_index] = 0;
                    va[2 * line_index + 1] = 0;
                }
            }
            pos.needsUpdate = true;
            geom.attributes.color.needsUpdate = true;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        init();

        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            // mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }}></div>;
};

export default ThreeScene;
