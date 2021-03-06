import { FC } from 'react';

import { makeStyles } from '@material-ui/core/styles';

type Props = {
  year: number;
};

const useClasses = makeStyles({
  footer: {
    height: 50,
    backgroundColor: '#393939',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    '& span': {
      verticalAlign: 'middle',
      fontWeight: 400,
      fontSize: 18,
      color: 'white'
    }
  }
});

const Footer: FC<Props> = ({ year }) => {
  const { footer } = useClasses();

  return (
    <footer className={footer}>
      <span>© React Blog - {year}</span>
    </footer>
  );
};

export default Footer;
