import { Grid, ImageCarousel, InformationCard, Title } from '@/components'
import { information } from '@/lib/settings'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div className='w-full flex flex-col gap-10'>
        <div className='w-full shadow-lg hover:shadow-2xl transition-all duration-500'>
          <ImageCarousel
            hideActionButtons={true}
            images={'/images/banner/1.png,/images/banner/2.png,/images/banner/3.png'}
          />
        </div>

        <Title>Information Section</Title>
        <div className='w-full px-10'>
          <div className='text-title '>Learn the basics</div>
          Here's what you need to know to start selling.
          <Grid className='mt-4'>
            {information.map((item, index) => (
              <InformationCard key={index} {...item} />
            ))}
          </Grid>
        </div>
        <Title>You've got this. We've got your back.</Title>
        <ImageCarousel
          hideActionButtons={true}
          images={'https://i.ebayimg.com/00/s/NDk4WDE0NDA=/z/nVYAAOSwcCxkm1Et/$_57.JPG'}
        />
      </div>
    </main>
  )
}
