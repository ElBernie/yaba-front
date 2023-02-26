import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useQueryClient, useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import api from '../../utils/api.utils';

function CreateBudgetButton() {
  const { t } = useTranslation();
  const [newBudgetName, setNewBudgetName] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => api.post('/budgets', data),
    onSuccess: () => {
      setShowModal(false);
      queryClient.invalidateQueries('budgets');
    },
  });

  return (
    <>
      <Dialog
        open={showModal}
        fullWidth
        maxWidth="sm"
        onClose={() => setShowModal(false)}>
        <DialogTitle>{t('budget.create.title')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label={t('budget.create.name.field')}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewBudgetName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>
            {t('budget.create.cancelButton')}
          </Button>
          <LoadingButton
            variant="contained"
            loading={isLoading}
            onClick={() =>
              mutate({
                name: newBudgetName,
              })
            }>
            {t('budget.create.button')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Button variant="contained" onClick={() => setShowModal(true)}>
        {t('budget.create.title')}
      </Button>
    </>
  );
}

export default CreateBudgetButton;
