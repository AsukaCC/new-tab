import { useEffect, useCallback, forwardRef } from 'react';
import styles from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAdding, setIsEditing } from '@/redux/slice/stateSlice';
import { RootState } from '@/redux';

const ContextMenu = forwardRef<HTMLDivElement>((_props, ref) => {
  const dispatch = useDispatch();
  const isEditing = useSelector((state: RootState) => state.state.isEditing);

  const handleContextMenu = useCallback((event: MouseEvent) => {
    event.preventDefault();
  }, []);

  const closeContextMenu = useCallback(() => {
    const contextMenuDom = document.getElementById('contextMenu');
    if (contextMenuDom) {
      contextMenuDom.style.display = 'none';
    }
  }, []);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const contextMenuDom = document.getElementById('contextMenu');
      if (
        event.button === 0 &&
        contextMenuDom &&
        contextMenuDom.style.display === 'block'
      ) {
        closeContextMenu();
      }

      if (isEditing) {
        dispatch(setIsEditing(false));
      }
    },
    [closeContextMenu, dispatch, isEditing]
  );

  const handleEditIcon = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      event.stopPropagation();
      closeContextMenu();
      dispatch(setIsEditing(true));
    },
    [dispatch, closeContextMenu]
  );

  const handleAddIcon = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      event.stopPropagation();
      closeContextMenu();
      dispatch(setIsAdding(true));
    },
    [dispatch, closeContextMenu]
  );

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, [handleContextMenu, handleClick]);

  return (
    <div id="contextMenu" className={styles.contextMenu} ref={ref}>
      <ul>
        <li className={styles.contextMenuItem} onClick={handleEditIcon}>
          <span>编辑图标</span>
        </li>
        <li className={styles.contextMenuItem} onClick={handleAddIcon}>
          <span>添加图标</span>
        </li>
      </ul>
    </div>
  );
});

export default ContextMenu;
