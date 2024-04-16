import { ChevronDownIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';
import { Fragment } from 'react';

interface FilterProps<T extends Record<string, any>> {
  onOpenItemsDropdown: () => void;
  openItemsDropdown: boolean;
  selectedItem: string;
  onSelectItem: (item?: T) => void;
  itemsFilterTitle: string;
  items: T[];
  itemPropertyName: string;
  isFilterable: boolean;
}

export default function Filter<T extends Record<string, any>>({
  onOpenItemsDropdown,
  openItemsDropdown,
  itemsFilterTitle,
  selectedItem,
  onSelectItem,
  items,
  itemPropertyName,
  isFilterable,
}: FilterProps<T>) {
  return (
    <div className='flex items-center gap-4'>
      <span className='text-lg font-[500]'>{itemsFilterTitle}:</span>
      <div
        className={clsx(
          'flex items-center justify-center gap-2 relative bg-light-gray px-6 py-2 rounded-3xl z-10',
          {
            ['hover:bg-gray-800 transition-colors duration-200 cursor-pointer']:
              !openItemsDropdown && isFilterable,
          }
        )}
        onClick={()=> {
          if (!isFilterable) return;
          onOpenItemsDropdown()
        }}
      >
        <span>{selectedItem}</span>
        {isFilterable && <ChevronDownIcon className='w-7 h-7' />}
        <div
          className={clsx({
            ['flex flex-col top-12 left-0 py-0 px-2 opacity-0 absolute max-h-0 max-w-full overflow-hidden transition-all duration-300 rounded-3xl']: !openItemsDropdown,
            ['flex overflow-y-hidden opacity-100 transition-all duration-300 max-w-full z-20 flex-col gap-2 absolute top-12 left-0 bg-light-gray rounded-3xl border px-2 py-2 max-h-40']:
              openItemsDropdown,
          })}
        >
          {items.map((item, index: number) => (
            <Fragment key={item.id}>
              {index === 0 && (
                <p
                  className={clsx(
                    'px-4 py-2 hover:bg-gray-800 transition-colors duration-200 rounded-3xl cursor-pointer',
                    {
                      ['bg-gray-800']:
                        selectedItem === 'Todos' || !selectedItem,
                    }
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedItem === 'Todos' || !selectedItem) return;
                    onSelectItem();
                  }}
                >
                  Todos
                </p>
              )}
              <p
                className={clsx(
                  'px-4 py-2 hover:bg-gray-800 transition-colors duration-200 rounded-3xl cursor-pointer',
                  {
                    ['bg-gray-800']: selectedItem === item[itemPropertyName],
                  }
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectItem(item);
                }}
              >
                {item[itemPropertyName]}
              </p>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
