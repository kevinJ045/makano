import Link from "next/link";


export function Navbar(){

  return (

    <div className="navbar">
      <div className="nav-group">
        <div className="title">Home</div>
        <div className="items">
          <div className="item">
            <Link href={'#about'}>About</Link>
          </div>
        </div>
      </div>
      <div className="nav-group">
        <div className="title">Archive</div>
        <div className="items">
          <div className="item">
            <Link href={'./archive/posts'}>Posts</Link>
          </div>
        </div>
      </div>
    </div>
    
  );

}