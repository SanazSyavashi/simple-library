//NODE-MODULES
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
//---------------------------------------------------------------------------------

interface IModalProps {
  title: string;
  content: string | React.JSX.Element;
  actions?: React.ReactNode;
  onClose: () => void;
  isModalOpen: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const Modal = (props: IModalProps) => {
  const {
    title,
    content,
    actions,
    isModalOpen,
    onClose,
    fullWidth = false,
    size = 'sm',
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const ContentParent =
    typeof content === 'string' ? DialogContent : React.Fragment;

  return (
    <>
      <Dialog
        scroll='paper'
        fullScreen={fullScreen}
        open={isModalOpen}
        onClose={onClose}
        fullWidth={fullWidth}
        maxWidth={size}>
        <DialogTitle className='text-xl capitalize'>{title}</DialogTitle>
        <ContentParent>{content}</ContentParent>
        {actions && <DialogActions>{actions}</DialogActions>}
      </Dialog>
    </>
  );
};

export default Modal;
