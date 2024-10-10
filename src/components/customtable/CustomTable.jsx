import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import UpDownIcon from '@/assets/images/dashboard/updown.svg?react';
import PropTypes from 'prop-types';
import NoData from '../../assets/icons/no-data.svg';
import { LoaderIcon } from 'lucide-react';
import { useEffect } from 'react';

const CustomTable = ({ headers, data, loading, onRowClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const handleSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== '') {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  useEffect(() => {}, [data]);
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <LoaderIcon className="animate-spin" />
        </div>
      ) : (
        <Table>
          <TableHeader className="font-medium text-white">
            <TableRow className="bg-transparent gradientCard rounded-xl border-none">
              {headers.map((header, index) => (
                <TableHead key={index} className={header.className}>
                  <div className="flex items-center justify-left">
                    {header.label}
                    <UpDownIcon
                      className="ml-2 right-0 cursor-pointer"
                      onClick={() => handleSort(header.key)}
                    />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={headers.length} className="text-center">
                  <div className="flex justify-center items-center w-full h-60">
                    <img
                      src={NoData}
                      className="object-contain h-full"
                      alt="No data"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((item, index) => (
                <TableRow
                  key={index}
                  className={`
                  ${index !== sortedData.length - 1 ? 'border-b-2' : 'border-b-0'}
                  ${onRowClick ? 'cursor-pointer' : ''} 
                  `}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {headers.map((header, idx) => (
                    <TableCell key={idx}>
                      {header.render
                        ? header.render(header.key ? item[header.key] : item)
                        : item[header.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CustomTable;

CustomTable.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onRowClick: PropTypes.func,
};
