import clsx from 'clsx';
interface Props {
  text : string,

}

const PrimaryButton = ({text}:Props) => {
  return (
    <div className={clsx('bg-yellow')}>
      {text}
    </div>
  )
}

export default PrimaryButton
