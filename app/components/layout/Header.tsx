"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { navigation, NavigationItem } from "@/data/navigation";
import logo from "@/assets/images/logos/logo.svg";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  className?: string;
}

export function Header({ className = "" }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [shouldShowBackground, setShouldShowBackground] = useState(false);
  const lastScrollY = useRef(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Vérifier si on est sur la page home et sur mobile
  const isHomePage = pathname === "/";
  const shouldUseWhiteOnMobile = isHomePage;

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (!mobileMenuOpen) {
        const currentScrollY = window.scrollY;
        const isScrollingUp = currentScrollY < lastScrollY.current;
        const isNearTop = currentScrollY < 50;

        setIsVisible(isScrollingUp || isNearTop);
        setIsAtTop(currentScrollY === 0);

        // On met à jour le background uniquement quand on scroll vers le haut
        if (isScrollingUp && !isNearTop) {
          setShouldShowBackground(true);
        } else if (isNearTop) {
          setShouldShowBackground(false);
        }

        lastScrollY.current = currentScrollY;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen]);

  if (!mounted) {
    return null;
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    open: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const contentVariants = {
    closed: { y: 20, opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const mobileMenuListVariants = {
    open: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
    closed: {},
  };
  const mobileMenuItemVariants = {
    closed: { y: 10, opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed left-0 right-0 top-0 z-40 flex w-full items-center transition-transform duration-300 ease-out will-change-transform ${className} ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          mobileMenuOpen
            ? "h-16 bg-transparent px-6 md:px-8 lg:px-16"
            : shouldShowBackground
              ? "h-16 bg-primary px-6 md:px-8 lg:px-16"
              : "h-16 bg-transparent px-6 md:px-8 lg:px-16"
        }`}
        style={{
          backfaceVisibility: "hidden",
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          {/* Logo */}
          <div>
            <Link href="/" className="z-50">
              <Image src={logo} alt="Logo" className="hidden md:block" />
              <Image src={logo} alt="Logo" className="block md:hidden" />
            </Link>
          </div>

          {/* Navigation sur desktop */}
          <div className="hidden items-center space-x-8 lg:flex">
            {navigation.map((item: NavigationItem, index: number) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`group relative text-sm uppercase tracking-wide transition-colors duration-300 ${isHomePage && !shouldShowBackground ? "hover:text-secondary/75" : "hover:text-secondary/75"}`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <PrimaryButton
                  text="Contact"
                  navigateTo="/#contact"
                  variant={
                    !isHomePage || shouldShowBackground
                      ? "secondary"
                      : undefined
                  }
                />
              </div>
            </div>
          </div>

          {/* Bouton menu mobile */}
          <button
            onClick={toggleMenu}
            className="z-50 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4E6B59"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-8 ${shouldShowBackground ? "bg-secondary" : shouldUseWhiteOnMobile ? "bg-primary" : "bg-secondary"} transition-all duration-300`}
                />
                <span
                  className={`block h-0.5 w-8 ${shouldShowBackground ? "bg-secondary" : shouldUseWhiteOnMobile ? "bg-primary" : "bg-secondary"} transition-all duration-300`}
                />
                <span
                  className={`block h-0.5 w-8 ${shouldShowBackground ? "bg-secondary" : shouldUseWhiteOnMobile ? "bg-primary" : "bg-secondary"} transition-all duration-300`}
                />
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Menu mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-primary lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            onTouchMove={(e) => e.preventDefault()}
            style={{ touchAction: "none" }}
          >
            <motion.div
              className="flex h-full flex-col items-center justify-center overflow-hidden px-4"
              variants={contentVariants}
            >
              <motion.div
                className="flex w-full flex-col items-center space-y-8 text-center"
                variants={mobileMenuListVariants}
                initial="closed"
                animate="open"
              >
                {navigation.map((item: NavigationItem) => (
                  <motion.div key={item.name} variants={mobileMenuItemVariants}>
                    <Link
                      href={item.href}
                      className="block text-xl font-light uppercase transition-colors duration-300"
                      onClick={(e) => {
                        if (window.location.pathname === item.href) {
                          e.preventDefault();
                        }
                        toggleMenu();
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={mobileMenuItemVariants}
                  className="flex w-full justify-center"
                >
                  <PrimaryButton
                    text="Contact"
                    navigateTo="/#contact"
                    className="!text-lg font-light"
                    variant="secondary"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
