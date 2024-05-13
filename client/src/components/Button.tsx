import clsx from 'clsx';
interface Props {
  text : string,
  onClick ?: ()=>void,

}

const PrimaryButton = ({text, onClick}:Props) => {
  return (
    <button onClick={onClick} className={clsx('bg-yellow border border-yellow font-inter text-black2 hover:text-yellow hover:bg-black px-3 py-2 md:px-6 md:py-4 text-sm font-semibold md:text-base transition-all duration-500 rounded-md')}>
      {text}
    </button>
  )
}

export default PrimaryButton
