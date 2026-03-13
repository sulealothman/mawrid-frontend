import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from '@/features/shared/icons/CommonIcons';
import Button from '../Button/Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';
    closeOnBackdrop?: boolean;
    showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    className = '',
    size = 'md',
    closeOnBackdrop = true,
    showCloseButton = true
}) => {
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        xxl: 'max-w-2xl',
        full: 'max-w-full mx-4'
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && closeOnBackdrop) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center px-2"
                    onClick={handleBackdropClick}
                >
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={showCloseButton ? onClose : undefined} />
                    
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`
                            relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden
                            bg-white
                            dark:bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl
                            ${className}
                        `}
                    >
                        {(title || showCloseButton) && (
                            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
                                {title && (
                                    <h2 className="text-lg font-semibold text-primary">
                                        {title}
                                    </h2>
                                )}
                                
                                {showCloseButton && (
                                    <Button
                                        variant='noStyle'
                                        onClick={onClose}
                                        className="p-2 transition-colors rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                        aria-label="Close modal"
                                    >
                                    <CloseIcon className="w-4 h-4 icon-stroke" viewBox='0 0 24 24' />
                                    </Button>
                                )}
                            </div>
                        )}
                        
                        <div className={`overflow-y-auto h-full max-h-[calc(100%-90px)]`}>
                            <div className="p-6 h-full">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export { Modal };