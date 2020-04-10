# Analysis

One simple way to check whether the values in a row or column are a permutation of the values from 1 to **N** is to sort them and then step through them, checking whether the sorted list starts at 1 and increases by 1 each time. Another option, which avoids the sort and takes time linear in **N**, is to look at the values one by one and store each one in a hash table-based data structure. If we ever find that a value is already in the set, then that row or column contains a repeated value. Because there are **N** values and the problem guarantees that they are integers between 1 and **N**, inclusive, the absence of duplicates implies that we have a permutation as desired.

Finding the trace is also straightforward — iterate through the rows taking the i-th value from the i-th row, and add the values together.
