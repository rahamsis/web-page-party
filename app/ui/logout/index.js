'use client'

import { signOut } from "next-auth/react"
import '../../customCss/buttonStyles.css'

export default function Button() {
    return (
        // <button className="button" onClick={() => signOut()}>
        //     Salir
        // </button>
        <button className="btn" type="button" onClick={() => signOut()}>
            <strong>SALIR</strong>
            <div id="container-stars">
                <div id="stars"></div>
            </div>

            <div id="glow">
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </button>


    );
}

