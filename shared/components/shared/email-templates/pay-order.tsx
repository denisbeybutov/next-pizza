import React from 'react'

interface EmailTemplateProps {
  orderId: number;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  orderId,
}) => {
  return (
    <div>
      <h1>Заказ #{orderId}</h1>
    </div>
  )
}