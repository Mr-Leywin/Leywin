import React, { useState, useEffect, useRef } from 'react';
import { FaSteam, FaSpotify, FaDiscord, FaVolumeUp, FaVolumeMute, FaSnowflake, FaTiktok, FaInstagram, FaGithub } from 'react-icons/fa';
import '../assets/css/kintaro.css';
import KintaroSnowEffect from './KintaroSnowEffect';
import kintaroBannerImage from '../assets/img/My_Landlady_Noona_Ep-126.png';
import kintaroProfileImage from '../assets/img/FB_IMG_1733060085266.jpg';
import kintaroAudioFile from '../assets/audio/kintaro_youtube_20250223_073225.mp3';

const Kintaro = () => {
    const [kintaroIsPlaying, setKintaroIsPlaying] = useState(false);
    const [kintaroVolume, setKintaroVolume] = useState(0.5);
    const [kintaroIsVolumeVisible, setKintaroIsVolumeVisible] = useState(false);
    const [kintaroShowOverlay, setKintaroShowOverlay] = useState(true);
    const [kintaroIsSnowActive, setKintaroIsSnowActive] = useState(true);
    const [kintaroSnowMessage, setKintaroSnowMessage] = useState(null);
    const kintaroAudioRef = useRef(null);

    const socialLinks = [
        { icon: <FaDiscord className="kintaro-icon" />, text: 'Discord', url: 'https://discord.gg/yZ8VgH7Qgq' },
        { icon: <FaSteam className="kintaro-icon" />, text: 'Steam', url: 'https://steamcommunity.com/profiles/76561199211465101/' },
        { icon: <FaTiktok className="kintaro-icon" />, text: 'TikTok', url: 'https://www.tiktok.com/@hentaikun13' },
        { icon: <FaInstagram className="kintaro-icon" />, text: 'Instagram', url: 'https://www.instagram.com/_arthurxcaera_/' },
        { icon: <FaSpotify className="kintaro-icon" />, text: 'Spotify', url: 'https://open.spotify.com/user/31oqeq2coakwgupta3inkjc5nxse?si=1b31145a544644f5' },
        { icon: <FaGithub className="kintaro-icon" />, text: 'Github', url: 'https://github.com/Mr-Leywin' },
    ];

    const getLinkLayoutClass = () => {
        return socialLinks.length >= 4 ? 'kintaro-links-grid' : 'kintaro-links-column';
    };

    useEffect(() => {
        if (kintaroIsPlaying) {
            kintaroAudioRef.current.play().catch((error) => {
                console.log('Ses çalınamadı:', error);
            });
        } else {
            kintaroAudioRef.current.pause();
        }
    }, [kintaroIsPlaying]);

    useEffect(() => {
        if (kintaroAudioRef.current) {
            kintaroAudioRef.current.volume = kintaroVolume;
        }
    }, [kintaroVolume]);

    const handleKintaroOverlayClick = () => {
        setKintaroShowOverlay(false);
        setKintaroIsPlaying(true);
    };

    const toggleKintaroMute = () => {
        if (kintaroVolume === 0) {
            setKintaroVolume(0.5);
        } else {
            setKintaroVolume(0);
        }
    };

    const toggleKintaroSnow = () => {
        const newSnowState = !kintaroIsSnowActive;
        setKintaroIsSnowActive(newSnowState);

        setKintaroSnowMessage(newSnowState ? 'Kar açıldı' : 'Kar kapatıldı');

        setTimeout(() => {
            setKintaroSnowMessage(null);
        }, 2000);
    };

    return (
        <div className="kintaro-container">
            {kintaroShowOverlay && (
                <div className="kintaro-overlay" onClick={handleKintaroOverlayClick}>
                    <div className="kintaro-overlay-text">click to enter...</div>
                </div>
            )}

            <div
                className="kintaro-banner-image"
                style={{ backgroundImage: `url(${kintaroBannerImage})` }}
            >
                <div className="kintaro-banner-overlay"></div>
            </div>

            <div className="kintaro-profile-card">
                <img src={kintaroProfileImage} alt="Profile" className="kintaro-profile-image" />
                <h2 className="kintaro-username">Arthur Leywin</h2>
                <p className="kintaro-bio">
                    Merhaba! Ben Arthur Leywin. Bu benim kişisel portfolyo sitem. Burada benim hakkımda daha fazla bilgi bulabilirsiniz.
                </p>
                <div className={`kintaro-links ${getLinkLayoutClass()}`}>
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            className="kintaro-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.icon}
                            <span>{link.text}</span>
                        </a>
                    ))}
                </div>
            </div>

            {!kintaroShowOverlay && (
                <div className="kintaro-controls">
                    <div
                        className="kintaro-music-controls"
                        onMouseEnter={() => setKintaroIsVolumeVisible(true)}
                        onMouseLeave={() => setKintaroIsVolumeVisible(false)}
                    >
                        <div className="kintaro-volume-icon" onClick={toggleKintaroMute}>
                            {kintaroVolume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
                        </div>
                        <div className={`kintaro-volume-slider-container ${kintaroIsVolumeVisible ? 'visible' : ''}`}>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={kintaroVolume}
                                onChange={(e) => setKintaroVolume(parseFloat(e.target.value))}
                                className="kintaro-volume-slider"
                            />
                        </div>
                    </div>
                    <div className="kintaro-snow-controls" onClick={toggleKintaroSnow}>
                        <div className="kintaro-snow-icon">
                            <FaSnowflake />
                        </div>
                    </div>
                </div>
            )}
            <audio ref={kintaroAudioRef} src={kintaroAudioFile} loop />
            {kintaroIsSnowActive && <KintaroSnowEffect />}

            {kintaroSnowMessage && (
                <div className="kintaro-snow-message">
                    {kintaroSnowMessage}
                </div>
            )}
        </div>
    );
};

export default Kintaro;