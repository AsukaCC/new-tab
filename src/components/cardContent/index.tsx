import styles from './index.module.css';
import { RootState } from '@/redux';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
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
    touchStartX.current = e.touches[0].clientX;
  };

  // 处理触摸结束
  const handleTouchEnd = (e: React.TouchEvent) => {
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
                  className={styles.websiteItem}
                  key={index}
                  onClick={() => openWebsite(item.url)}>
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
