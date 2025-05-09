import Image from 'next/image'
import { Posts } from '../posts/page'
import { Projects } from '../projects/page'

export default function Home() {
  return (
    <div className="home">
      <div className="text-xl font-bold"> Home/ </div>
      <div className="m-5">
        <div className="text-lg font-bold opacity-60"> Posts </div>
        <div className="mt-2">
          <Posts length={3} page={0} />
        </div>
      </div>
      <div className="m-5">
        <div className="text-lg font-bold opacity-60"> Projects </div>
        <div className="mt-2">
          <Projects length={3} page={0} />
        </div>
      </div>
    </div>
  )
}
