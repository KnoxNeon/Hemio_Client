import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer z-10 sm:footer-horizontal bg-gray-400 text-white p-10">
  <aside>
    <img className='h-24 w-24' src="./logologo.png" alt="" />
    <p className=''>
      Providing reliable pet services since 1992
    </p>
  </aside>
 
  <nav>
    <h6 className="footer-title text-yellow-400">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
   <nav>
    <h6 className="footer-title text-yellow-400">Social</h6>
    <div className="grid grid-flow-col gap-4">
      <a>
        <FaXTwitter className="w-6 h-6" />
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
</footer>

)
}
export default Footer
