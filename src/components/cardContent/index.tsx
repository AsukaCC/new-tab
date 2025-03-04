import styles from './index.module.css';
import { RootState } from '@/redux';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { setWebsiteList } from '@/redux/slice/configSlice';
import { setShowPage } from '@/redux/slice/stateSlice';

const CardContent: React.FC = () => {
  const dispatch = useDispatch();
  const isDirectLink = useSelector(
    (state: RootState) => state.config.isDirectLink
  );
  const isEditing = useSelector((state: RootState) => state.state.isEditing);
  const localWebsiteList = useSelector(
    (state: RootState) => state.config.websiteList
  );
  const showPage = useSelector((state: RootState) => state.state.showPage);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const MIN_SWIPE_DISTANCE = 50; // 最小滑动距离

  // 添加拖拽相关状态
  const [draggedItem, setDraggedItem] = useState<{ pageIndex: number; itemIndex: number } | null>(null);
  const [dragOverItem, setDragOverItem] = useState<{ pageIndex: number; itemIndex: number } | null>(null);
  // 触摸拖拽相关状态
  const [touchDragging, setTouchDragging] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const touchedElement = useRef<HTMLElement | null>(null);

  const openWebsite = (url: string) => {
    if (isEditing) return;
    if (isDirectLink) {
      window.location.href = url;
    } else {
      window.open(url, '_blank');
    }
  };

  const removeIcon = (index: number) => {
    const list = JSON.parse(JSON.stringify(localWebsiteList));
    list[showPage].splice(index, 1);

    // 如果当前页面没有元素了
    if (list[showPage].length === 0) {
      // 移除空页面
      list.splice(showPage, 1);

      // 如果删除后还有其他页面
      if (list.length > 0) {
        // 如果当前页是最后一页，则显示前一页
        if (showPage >= list.length) {
          dispatch(setShowPage(list.length - 1));
        }
        // 否则保持在当前页（因为后面的页面会自动前移）
      } else {
        // 如果没有页面了，重置为空数组和第一页
        dispatch(setShowPage(0));
      }
    }

    dispatch(setWebsiteList(list));
  };

  // 处理触摸开始
  const handleTouchStart = (e: React.TouchEvent) => {
    // 记录水平滑动的起始位置
    touchStartX.current = e.touches[0].clientX;

    // 如果不在编辑模式，不处理拖拽
    if (!isEditing) return;

    // 获取被触摸的元素
    const element = e.currentTarget as HTMLElement;
    touchedElement.current = element;

    // 设置长按定时器，长按后开始拖拽
    const timer = setTimeout(() => {
      if (element && element.dataset && element.dataset.pageIndex && element.dataset.itemIndex) {
        const pageIndex = parseInt(element.dataset.pageIndex);
        const itemIndex = parseInt(element.dataset.itemIndex);

        // 设置拖拽状态
        setDraggedItem({ pageIndex, itemIndex });
        setTouchDragging(true);

        // 添加视觉反馈
        element.classList.add(styles.dragging);
      }
    }, 500); // 500ms长按触发拖拽

    setLongPressTimer(timer);
  };

  // 处理触摸移动
  const handleTouchMove = (e: React.TouchEvent) => {
    // 如果不在拖拽状态，取消长按定时器
    if (!touchDragging && longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }

    // 如果不在拖拽状态，不处理
    if (!touchDragging || !draggedItem) return;

    // 阻止默认滚动行为
    e.preventDefault();

    // 获取当前触摸位置
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    // 获取所有可拖放的元素
    const droppableElements = document.querySelectorAll(`.${styles.websiteItem}[data-page-index="${showPage}"]`);

    // 查找当前触摸位置下的元素
    let targetElement: Element | null = null;

    droppableElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (
        touchX >= rect.left &&
        touchX <= rect.right &&
        touchY >= rect.top &&
        touchY <= rect.bottom
      ) {
        targetElement = element;
      }
    });

    // 如果找到目标元素，更新拖拽目标
    if (targetElement) {
      const htmlElement = targetElement as HTMLElement;
      if (htmlElement.dataset && htmlElement.dataset.pageIndex && htmlElement.dataset.itemIndex) {
        const pageIndex = parseInt(htmlElement.dataset.pageIndex);
        const itemIndex = parseInt(htmlElement.dataset.itemIndex);

        // 更新拖拽目标
        setDragOverItem({ pageIndex, itemIndex });

        // 移除所有元素的dragOver类
        droppableElements.forEach((el) => {
          (el as HTMLElement).classList.remove(styles.dragOver);
        });

        // 给当前目标添加dragOver类
        htmlElement.classList.add(styles.dragOver);
      }
    }
  };

  // 处理触摸结束
  const handleTouchEnd = (e: React.TouchEvent) => {
    // 处理水平滑动翻页
    touchEndX.current = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX.current - touchStartX.current;

    // 判断滑动方向和距离
    if (Math.abs(swipeDistance) > MIN_SWIPE_DISTANCE) {
      if (swipeDistance > 0 && showPage > 0) {
        dispatch(setShowPage(showPage - 1));
      } else if (swipeDistance < 0 && showPage < localWebsiteList.length - 1) {
        dispatch(setShowPage(showPage + 1));
      }
    }

    // 清除长按定时器
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }

    // 如果在拖拽状态，处理排序
    if (touchDragging && draggedItem && dragOverItem) {
      // 确保在同一页内拖拽
      if (draggedItem.pageIndex === dragOverItem.pageIndex && draggedItem.pageIndex === showPage) {
        const list = JSON.parse(JSON.stringify(localWebsiteList));
        const currentPage = list[showPage];

        // 获取被拖拽的项
        const draggedItemContent = currentPage[draggedItem.itemIndex];

        // 从原位置删除
        currentPage.splice(draggedItem.itemIndex, 1);

        // 插入到新位置
        currentPage.splice(dragOverItem.itemIndex, 0, draggedItemContent);

        // 更新状态
        dispatch(setWebsiteList(list));
      }
    }

    // 重置拖拽状态
    if (touchedElement.current) {
      touchedElement.current.classList.remove(styles.dragging);
    }

    // 移除所有元素的dragOver类
    const droppableElements = document.querySelectorAll(`.${styles.websiteItem}`);
    droppableElements.forEach((el) => {
      (el as HTMLElement).classList.remove(styles.dragOver);
    });

    setTouchDragging(false);
    setDraggedItem(null);
    setDragOverItem(null);
    touchedElement.current = null;
  };

  // 处理鼠标滑动
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    touchEndX.current = e.clientX;
    const swipeDistance = touchEndX.current - touchStartX.current;

    // 判断滑动方向和距离
    if (Math.abs(swipeDistance) > MIN_SWIPE_DISTANCE) {
      if (swipeDistance > 0 && showPage > 0) {
        // 向右滑，显示上一页
        dispatch(setShowPage(showPage - 1));
      } else if (swipeDistance < 0 && showPage < localWebsiteList.length - 1) {
        // 向左滑，显示下一页
        dispatch(setShowPage(showPage + 1));
      }
    }
  };

  // 拖拽开始
  const handleDragStart = (e: React.DragEvent, pageIndex: number, itemIndex: number) => {
    if (!isEditing) return;
    setDraggedItem({ pageIndex, itemIndex });
    // 设置拖拽时的半透明效果
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.4';
    }
    // 设置拖拽图像（可选）
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  // 拖拽结束
  const handleDragEnd = (e: React.DragEvent) => {
    if (!isEditing) return;
    // 恢复透明度
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }

    // 如果有拖拽项和目标项，执行排序
    if (draggedItem && dragOverItem) {
      // 确保在同一页内拖拽
      if (draggedItem.pageIndex === dragOverItem.pageIndex && draggedItem.pageIndex === showPage) {
        const list = JSON.parse(JSON.stringify(localWebsiteList));
        const currentPage = list[showPage];

        // 获取被拖拽的项
        const draggedItemContent = currentPage[draggedItem.itemIndex];

        // 从原位置删除
        currentPage.splice(draggedItem.itemIndex, 1);

        // 插入到新位置
        currentPage.splice(dragOverItem.itemIndex, 0, draggedItemContent);

        // 更新状态
        dispatch(setWebsiteList(list));
      }
    }

    // 重置拖拽状态
    setDraggedItem(null);
    setDragOverItem(null);
  };

  // 拖拽经过
  const handleDragOver = (e: React.DragEvent) => {
    if (!isEditing) return;
    e.preventDefault(); // 必须阻止默认行为才能触发drop
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  // 拖拽进入
  const handleDragEnter = (e: React.DragEvent, pageIndex: number, itemIndex: number) => {
    if (!isEditing) return;
    e.preventDefault();
    setDragOverItem({ pageIndex, itemIndex });
  };

  return (
    <>
      <div
        className={styles.websiteContainer}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>
        <div className={styles.websiteWrapper}>
          {localWebsiteList.map((pageList, pageIndex) => (
            <div
              className={styles.websiteList}
              key={pageIndex}
              style={{
                transform: `translateX(${(pageIndex - showPage) * 100}%)`,
                visibility:
                  Math.abs(pageIndex - showPage) > 1 ? 'hidden' : 'visible',
              }}>
              {pageList.map((item, index) => (
                <div
                  className={`${styles.websiteItem} ${
                    draggedItem && draggedItem.pageIndex === pageIndex &&
                    draggedItem.itemIndex === index ? styles.dragging : ''
                  } ${
                    dragOverItem && dragOverItem.pageIndex === pageIndex &&
                    dragOverItem.itemIndex === index ? styles.dragOver : ''
                  }`}
                  key={index}
                  data-page-index={pageIndex}
                  data-item-index={index}
                  onClick={() => openWebsite(item.url)}
                  draggable={isEditing}
                  onDragStart={(e) => handleDragStart(e, pageIndex, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e, pageIndex, index)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}>
                  {isEditing && (
                    <svg
                      className={`icon ${styles.editIcon}`}
                      aria-hidden="true"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeIcon(index);
                      }}>
                      <use xlinkHref="#icon-guanbi"></use>
                    </svg>
                  )}
                  <div className={styles.favicon}>
                    <img
                      src={`https://api.jiangcheng.site/api/favicon?url=${item.url}`}
                      alt={`${item.name} favicon`}
                    />
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.pagination}>
        {localWebsiteList.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${
              showPage === index ? styles.active : ''
            }`}
            onClick={() => dispatch(setShowPage(index))}
          />
        ))}
      </div>
    </>
  );
};

export default CardContent;
