// From https://www.w3.org/WAI/tutorials/tables/one-header/#table-with-header-cells-in-the-top-row-only
export const tableWithHeaderCellsInTheTopRowOnly = `<table>
  <tbody><tr>
    <th>Date</th>
    <th>Event</th>
    <th>Venue</th>
  </tr>
  <tr>
    <td>12 February</td>
    <td>Waltz with Strauss</td>
    <td>Main Hall</td>
  </tr>
  <tr>
    <td>24 March</td>
    <td>The Obelisks</td>
    <td>West Wing</td>
  </tr>
  <tr>
    <td>14 April</td>
    <td>The What</td>
    <td>Main Hall</td>
  </tr>
</tbody></table>`;

// From https://www.w3.org/WAI/tutorials/tables/one-header/#table-with-header-cells-in-the-first-column-only

export const tableWithHeaderCellsInTheFirstColumnOnly = `<table>
  <tr>
    <th>Date</th>
    <td>12 February</td>
    <td>24 March</td>
    <td>14 April</td>
  </tr>
  <tr>
    <th>Event</th>
    <td>Waltz with Strauss</td>
    <td>The Obelisks</td>
    <td>The What</td>
  </tr>
  <tr>
    <th>Venue</th>
    <td>Main Hall</td>
    <td>West Wing</td>
    <td>Main Hall</td>
  </tr>
</table>`;

// From https://www.w3.org/WAI/tutorials/tables/two-headers/#table-with-header-cells-in-the-top-row-and-first-column

export const tableWithHeaderCellsInTheTopRowAndFirstColumn = `<table>
  <caption>Delivery slots:</caption>
  <tbody><tr>
    <td></td>
    <th scope="col">Monday</th>
    <th scope="col">Tuesday</th>
    <th scope="col">Wednesday</th>
    <th scope="col">Thursday</th>
    <th scope="col">Friday</th>
  </tr>
  <tr>
    <th scope="row">09:00 – 11:00</th>
    <td>Closed</td>
    <td>Open</td>
    <td>Open</td>
    <td>Closed</td>
    <td>Closed</td>
  </tr>
  <tr>
    <th scope="row">11:00 – 13:00</th>
    <td>Open</td>
    <td>Open</td>
    <td>Closed</td>
    <td>Closed</td>
    <td>Closed</td>
  </tr>
  <tr>
    <th scope="row">13:00 – 15:00</th>
    <td>Open</td>
    <td>Open</td>
    <td>Open</td>
    <td>Closed</td>
    <td>Closed</td>
  </tr>
  <tr>
    <th scope="row">15:00 – 17:00</th>
    <td>Closed</td>
    <td>Closed</td>
    <td>Closed</td>
    <td>Open</td>
    <td>Open</td>
  </tr>
</tbody></table>`;

// From https://www.w3.org/WAI/tutorials/tables/two-headers/#table-with-an-offset-column-of-header-cells

export const tableWithAnOffsetColumnOfHeaderCells = `<table class="numbers">
  <caption>
    Holidays taken in the last six months
  </caption>
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">July</th>
      <th scope="col">August</th>
      <th scope="col">September</th>
      <th scope="col">October</th>
      <th scope="col">November</th>
      <th scope="col">December</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>215</td>
      <th scope="row">Abel</th>
      <td>5</td>
      <td>2</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>3</td>
    </tr>

    <tr>
      <td>231</td>
      <th scope="row">Annette </th>
      <td>0</td>
      <td>5</td>
      <td>3</td>
      <td>0</td>
      <td>0</td>
      <td>6</td>
    </tr>

    <tr>
      <td>173</td>
      <th scope="row">Bernard</th>
      <td>2</td>
      <td>0</td>
      <td>0</td>
      <td>5</td>
      <td>0</td>
      <td>0</td>
    </tr>

    <tr>
      <td>141</td>
      <th scope="row">Gerald</th>
      <td>0</td>
      <td>10</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>8</td>
    </tr>

    <tr>
      <td>99</td>
      <th scope="row">Michael</th>
      <td>8</td>
      <td>8</td>
      <td>8</td>
      <td>8</td>
      <td>0</td>
      <td>4</td>
    </tr>
  </tbody>
</table>`;

// From https://www.w3.org/WAI/tutorials/tables/irregular/#table-with-two-tier-headers

export const tableWithTwoTierHeaders = `<table class="numbers">
  <colgroup><col>
  </colgroup><colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>
  <tbody><tr>
    <td rowspan="2"></td>
    <th colspan="2" scope="colgroup">Mars</th>
    <th colspan="2" scope="colgroup">Venus</th>
  </tr>
  <tr>
    <th scope="col">Produced</th>
    <th scope="col">Sold</th>
    <th scope="col">Produced</th>
    <th scope="col">Sold</th>
  </tr>
  <tr>
    <th scope="row">Teddy&nbsp;Bears</th>
    <td>50,000</td>
    <td>30,000</td>
    <td>100,000</td>
    <td>80,000</td>
  </tr>
  <tr>
    <th scope="row">Board&nbsp;Games</th>
    <td>10,000</td>
    <td>5,000</td>
    <td>12,000</td>
    <td>9,000</td>
  </tr>
</tbody></table>`;

// From https://www.w3.org/WAI/tutorials/tables/irregular/#table-with-headers-spanning-multiple-rows-or-columns

export const tableWithHeadersSpanningMultipleRowsOrColumns = `<table>
  <caption>
    Poster availability
  </caption>
  <colgroup><col>
  <col>
  </colgroup><colgroup span="3"></colgroup>
  <thead>
    <tr>
      <th scope="col">Poster name</th>
      <th scope="col">Color</th>
      <th colspan="3" scope="colgroup">Sizes available</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" scope="rowgroup">Zodiac</th>
      <th scope="row">Full color</th>
      <td>A2</td>
      <td>A3</td>
      <td>A4</td>
    </tr>
    <tr>
      <th scope="row">Black and white</th>
      <td>A1</td>
      <td>A2</td>
      <td>A3</td>
    </tr>
    <tr>
      <th scope="row">Sepia</th>
      <td>A3</td>
      <td>A4</td>
      <td>A5</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <th rowspan="2" scope="rowgroup">Angels</th>
      <th scope="row">Black and white</th>
      <td>A1</td>
      <td>A3</td>
      <td>A4</td>
    </tr>
    <tr>
      <th scope="row">Sepia</th>
      <td>A2</td>
      <td>A3</td>
      <td>A5</td>
    </tr>
  </tbody>
</table>`;

// From https://www.w3.org/WAI/tutorials/tables/multi-level/#table-with-multiple-column-headers-in-each-column

export const tableWithMultipleColumnHeadersInEachColumn = `<table>
  <caption>
    Supplier contacts
  </caption>
  <tbody><tr>
    <td id="blank">&nbsp;</td>
    <th id="co1" headers="blank">Example 1 Ltd</th>
    <th id="co2" headers="blank">Example 2 Co</th>
  </tr>
  <tr>
    <th id="c1" headers="blank">Contact</th>
    <td headers="co1 c1">James Phillips</td>
    <td headers="co2 c1">Marie Beauchamp</td>
  </tr>
  <tr>
    <th id="p1" headers="blank">Position</th>
    <td headers="co1 p1">Sales Director</td>
    <td headers="co2 p1">Sales Manager</td>
  </tr>
  <tr>
    <th id="e1" headers="blank">Email</th>
    <td headers="co1 e1">jp@1ltd.example.com</td>
    <td headers="co2 e1">marie@2co.example.com</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <th id="co3" headers="blank">Example 3 Ltd</th>
    <th id="co4" headers="blank">Example 4 Inc</th>
  </tr>
  <tr>
    <th id="c2" headers="blank">Contact</th>
    <td headers="co3 c2">Suzette Jones</td>
    <td headers="co4 c2">Alex Howe</td>
  </tr>
  <tr>
    <th id="p2" headers="blank">Position</th>
    <td headers="co3 p2">Sales Officer</td>
    <td headers="co4 p2">Sales Director</td>
  </tr>
  <tr>
    <th id="e2" headers="blank">Email</th>
    <td headers="co3 e2">Suz@ltd3.example.com</td>
    <td headers="co4 e2">howe@4inc.example.com</td>
  </tr>
</tbody></table>`;

// From https://www.w3.org/WAI/tutorials/tables/multi-level/#table-with-three-headers-related-to-each-data-cell

export const tableWithThreeHeadersRelatedToEachDataCell = `<table class="numbers" summary="Column one has the location and size of accommodation, other columns show the type and number of properties available">
<caption>
    Availability of holiday accommodation
</caption>
<thead>
    <tr>
        <td></td>
        <th id="stud" scope="col">
            Studio
        </th>
        <th id="apt" scope="col">
            <abbr title="Apartment">Apt</abbr>
        </th>
        <th id="chal" scope="col">
            Chalet
        </th>
        <th id="villa" scope="col">
            Villa
        </th>
    </tr>
</thead>
<tbody>
    <tr>
        <th id="par" class="span" colspan="5" scope="colgroup">
            Paris
        </th>
    </tr>
    <tr>
        <th headers="par" id="pbed1">
            1 bedroom
        </th>
        <td headers="par pbed1 stud">
            11
        </td>
        <td headers="par pbed1 apt">
            20
        </td>
        <td headers="par pbed1 chal">
            25
        </td>
        <td headers="par pbed1 villa">
            23
        </td>
    </tr>
    <tr>
        <th headers="par" id="pbed2">
            2 bedroom
        </th>
        <td headers="par pbed2 stud">
            -
        </td>
        <td headers="par pbed2 apt">
            43
        </td>
        <td headers="par pbed2 chal">
            52
        </td>
        <td headers="par pbed2 villa">
            32
        </td>
    </tr>
    <tr>
        <th headers="par" id="pbed3">
            3 bedroom
        </th>
        <td headers="par pbed3 stud">
            -
        </td>
        <td headers="par pbed3 apt">
            13
        </td>
        <td headers="par pbed3 chal">
            15
        </td>
        <td headers="par pbed3 villa">
            40
        </td>
    </tr>
    <tr>
        <th id="rome" class="span" colspan="5" scope="colgroup">
            Rome
        </th>
    </tr>
    <tr>
        <th id="rbed1" headers="rome">
            1 bedroom
        </th>
        <td headers="rome rbed1 stud">
            13
        </td>
        <td headers="rome rbed1 apt">
            21
        </td>
        <td headers="rome rbed1 chal">
            22
        </td>
        <td headers="rome rbed1 villa">
            3
        </td>
    </tr>
    <tr>
        <th id="rbed2" headers="rome">
            2 bedroom
        </th>
        <td headers="rome rbed2 stud">
            -
        </td>
        <td headers="rome rbed2 apt">
            23
        </td>
        <td headers="rome rbed2 chal">
            43
        </td>
        <td headers="rome rbed2 villa">
            30
        </td>
    </tr>
    <tr>
        <th id="rbed3" headers="rome">
            3 bedroom
        </th>
        <td headers="rome rbed3 stud">
            -
        </td>
        <td headers="rome rbed3 apt">
            16
        </td>
        <td headers="rome rbed3 chal">
            32
        </td>
        <td headers="rome rbed3 villa">
            40
        </td>
    </tr>
</tbody>
</table>`;

// From https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tfoot#table_with_footer

const tableWithFooter = `<table>
  <thead>
    <tr>
      <th>Student ID</th>
      <th>Name</th>
      <th>Major</th>
      <th>Credits</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>3741255</td>
      <td>Jones, Martha</td>
      <td>Computer Science</td>
      <td>240</td>
    </tr>
    <tr>
      <td>3971244</td>
      <td>Nim, Victor</td>
      <td>Russian Literature</td>
      <td>220</td>
    </tr>
    <tr>
      <td>4100332</td>
      <td>Petrov, Alexandra</td>
      <td>Astrophysics</td>
      <td>260</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th colspan="3" scope="row">Average Credits</th>
      <td>240</td>
    </tr>
  </tfoot>
</table>`;

export const tableSortable = `<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Birthday</th>
      <th>Age</th>
      <th>Test signature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Simon</th>
      <td data-sort="1982-06-02">02/06/1982</td>
      <td>42</td>
      <td>Blu / Daron Crew</td>
    </tr>
    <tr>
      <th>Nico</th>
      <td data-sort="1990-10-31">31/10/1990</td>
      <td>35</td>
      <td>DC Comics (Batman, Jocker, etc.)</td>
    </tr>
    <tr>
      <th>Guirec</th>
      <td data-sort="1985-12-30">30/12/1985</td>
      <td>39</td>
      <td>Pat'Patrouille</td>
    </tr>
  </tbody>
</table>`;

export const tables = [
  tableWithHeaderCellsInTheTopRowOnly,
  tableWithHeaderCellsInTheFirstColumnOnly,
  tableWithHeaderCellsInTheTopRowAndFirstColumn,
  tableWithAnOffsetColumnOfHeaderCells,
  tableWithTwoTierHeaders,
  tableWithHeadersSpanningMultipleRowsOrColumns,
  tableWithMultipleColumnHeadersInEachColumn,
  tableWithThreeHeadersRelatedToEachDataCell,
  tableWithFooter,
];
