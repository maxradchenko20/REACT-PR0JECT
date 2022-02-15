import {FC} from "react";

import {makeStyles} from '@material-ui/core/styles';

type FooterProps = {
  year: number
}

const useClasses = makeStyles({
  footer: {
    height: '50px',
    backgroundColor: '#393939',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& span': {
      verticalAlign: 'middle',
      fontWeight: 400,
      fontSize: '18px',
      color: 'white',
    }
  }
})

export const Footer: FC<FooterProps> = ({year}) => {

  const {footer} = useClasses();

  return (
    <footer className={footer}>
      <span>© React Blog - {year}</span>
    </footer>
  );
};
