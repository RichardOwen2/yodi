'use client'

interface HeadingProps {
  authName: string
}

const Heading: React.FC<HeadingProps> = ({authName}) => {
  return ( 
    <div>
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <h3 className="pt-1">Welcome {authName}</h3>
    </div>
   );
}
 
export default Heading;