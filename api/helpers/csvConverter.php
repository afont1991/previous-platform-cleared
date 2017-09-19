<?php

function csv_to_array($filename='', $delimiter=',')
{
    if(!file_exists($filename) || !is_readable($filename))
        return FALSE;

    $header = NULL;
    $data = array();
    if (($handle = fopen($filename, 'r')) !== FALSE)
    {
        while (($row = fgetcsv($handle, 1000, $delimiter)) !== FALSE)
        {
            $newRow = [];
            foreach ($row as $column) {
                $newRow[] = preg_replace('/[\x00-\x1F\x7F]/', '', $column);
            }
            $row = $newRow;
            if(!$header)
                $header = $row;
            else
                $data[] = array_combine($header, $row);
        }
        fclose($handle);
    }
    return $data;
}
var_dump(csv_to_array('customers.csv')[0]);