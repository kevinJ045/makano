'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Archive from './archive';

export default function ArchiveDialog({ show, close }: { show: boolean, close?: () => void }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="archive-dialog"
          initial={{ x: '120%', y: '-50%' }}
          animate={{ x: '12%', y: '-50%' }}
          exit={{ x: '120%', y: '-50%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="rounded-l-2xl top-1/2 overflow-hidden fixed w-[90vw] h-[95dvh] bg-ctp-mantle z-50"
        >
          <Archive close={close} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
