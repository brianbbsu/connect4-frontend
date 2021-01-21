import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';


const SimpleDialog = ({content, open, onClose}) => (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
);

export { SimpleDialog };