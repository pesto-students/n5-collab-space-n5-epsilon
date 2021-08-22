import React from "react"
import Link from "next/link";
// import Image from "./image"

export default function AboutUs( prop ) {
    return <section className='aboutUs'>
        <div className='container'>
            <div className={ prop.showMe  ? "row changed" : "row" }>
                <div data-sal="slide-right" data-sal-duration="900" className='content-wrapper' data-wow-offset="20">
                    <span className='title'>ABOUT US</span>
                    <h3>Revolutionizing the way People Use Crypto</h3>
                    {/*<Image className='responsive-image' src={'about-us.png'} alt='about us'/>*/}
                    <p>Rupeso is a multi cryptocurrency wallet for both Android and iOS devices that supports Bitcoin, Ethereum, Bitcoin Cash, Litecoin and Stellar assets. It is designed to store your cryptocurrencies in a decentralized and a non-custodial way.</p>
                    <p>{prop.additionalData}</p>
                    <div className='btn-wrapper'>
                        <Link href={prop.showMe ? '/features' : '/about'} className={'default-btn'}>Features</Link>
                        <span className={'play-btn'}>Watch Video</span>
                    </div>
                </div>
                <div data-sal="slide-left" data-sal-duration="900" className='img-wrapper'>
                    {/*<Image src={'about-us.png'} alt='about us'/>*/}
                </div>
            </div>
        </div>
    </section>
}
