'use client'

import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({onChange}) => {
  return <AddressSuggestions
  token={process.env.NEXT_PUBLIC_TOKEN_DA_DATA!}
  onChange={(data) => onChange?.(data?.value)}/>
}