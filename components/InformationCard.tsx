interface Props {
  title: string
  description: string
  number: number
}

const InformationCard = ({ title, description, number }: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='w-[60px] h-[60px] bg-primary rounded-full flex items-center justify-center text-white'>
        {number}
      </div>
      <div className='text-subtitle'>{title}</div>
      <div className='text-paragraph max-w-[300px] min-w-[300px]'>{description}</div>
    </div>
  )
}

export default InformationCard
