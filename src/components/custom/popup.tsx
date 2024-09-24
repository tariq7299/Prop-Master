import * as React from "react"
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from "react-icons/io5";
import SnowFlakes from './snow-flakes';



const Fade = ({ isVisible, children, containerClass, cardClass, closeModal, cardBodyClass, hasDissmissButton, hasSnowflake, holderClass, staticOverlay }: any) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.64, 0, 0, 0.99] }}
                    className='fullscreen-loader is-popup p-0 m-0'
                >
                    <motion.div className={`fullscreen-loader-inner p-2 ${holderClass || ''}`} onClick={() => {
                        if (!staticOverlay) {
                            closeModal()
                        }
                    }}>


                        <div className={`row w-100 g-0`}>
                            <div className={`${containerClass || 'col-lg-6 col-md-8'} ${hasSnowflake ? 'position-relative overflow-hidden' : ''} mx-auto`}>

                                <motion.div
                                    className={`card bg-white ${cardClass}`}
                                    style={{ borderRadius: '0.5rem', maxHeight: 'calc(100vh - 7rem)', overflow: 'auto' }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, ease: [0.64, 0, 0, 0.99] }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {hasDissmissButton && (
                                        <div className="position-absolute top-0 start-0">
                                            <button type="button" aria-label="CloseButton" className="btn btn-link shadow-0 text-dark p-3" onClick={closeModal}>
                                                <IoClose size={24} />
                                            </button>
                                        </div>
                                    )}
                                    <div className={`card-body ${cardBodyClass || ''}`}>{children}</div>
                                </motion.div>
                                {hasSnowflake && (
                                    <SnowFlakes gray={true} />
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

function Popup({ status, children, containerClass, cardClass, cardBodyClass, closeModal, hasDissmissButton, hasSnowflake, holderClass, staticOverlay }: any) {
    return (
        <Fade isVisible={status} staticOverlay={staticOverlay} containerClass={containerClass} cardClass={cardClass} cardBodyClass={cardBodyClass} closeModal={closeModal} hasDissmissButton={hasDissmissButton} hasSnowflake={hasSnowflake} holderClass={holderClass}>
            {children}
        </Fade>
    );
}

export default Popup;
