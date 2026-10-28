"use client"

import React from "react"
import { Container } from "./container"
import Image from "next/image"
import Link from "next/link"
import { SearchInput } from "./search-input"
import { CartButton } from "./cart-button"
import { ProfileButton } from "./profile-button"
import { AuthModal } from "./modals"
import { useSearchParam } from "react-use"
import { useRouter, useSearchParams } from "next/navigation"
import toast from "react-hot-toast"

interface Props {
  hasSearch?: boolean
  hasCart?: boolean
  className?: string
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false)

  const serachParams = useSearchParams();

  React.useEffect(() => {
    if (!serachParams.has('verified')) return;
  
    toast.success('Почта успешно подтверждена', {
      id: 'email-verified',
      duration: 3000,
    });
  
    router.replace('/');
  }, [serachParams, router]);

  return (
    <header className={className}>
      <Container className="flex items-center justify-between py-8">
        {/*Левая часть */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl font-black uppercase">Next Pizza</h1>
              <p className="text-sm leading-3 text-gray-400">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}
