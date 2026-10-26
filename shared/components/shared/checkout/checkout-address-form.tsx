'use client'

import React from 'react';
import { WhiteBlock } from '../white-block';
import { Input, Textarea } from '../../ui';
import { FormTextarea } from '../form-components';


import dynamic from 'next/dynamic';

const AddressInput = dynamic(
  () => import('../address-input').then((mod) => mod.AddressInput),
  { ssr: false }
);

interface Props {
    className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    return (
      <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <AddressInput/>
        <FormTextarea
          name='comment'
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
    );
};