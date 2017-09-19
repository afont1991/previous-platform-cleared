const dealResults = [
  {
    title: 'Project Toy',
    status: 'Seeking Matches',
    created: '12/12/17',
    debtType: 'Senior',
    type: 'LBO',
    endDate: '12/12/17',
  },
  {
    title: 'Northeast Energy Project',
    status: 'Seeking Terms',
    created: '12/12/17',
    debtType: 'Senior',
    type: 'LBO',
    endDate: '12/12/17',
  },
  {
    title: 'Project Steel',
    status: 'Seeking Terms',
    created: '12/12/17',
    debtType: 'Senior',
    type: 'LBO',
    endDate: '12/12/17',
  },
  {
    title: 'Project Toy',
    status: 'Sending Terms',
    created: '12/12/17',
    debtType: 'Senior',
    type: 'LBO',
    endDate: '12/12/17',
  },
  {
    title: 'Project Toy',
    status: 'Seeking Matches',
    created: '12/12/17',
    debtType: 'Senior',
    type: 'LBO',
    endDate: '12/12/17',
  },
];

const dealFilters = {
  sections: [
    {
      section_name: 'Deal Details',
      sub_sections: [
        {
          sub_section_name: "Deal Size",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Size',
              id: 'size',
              value: false,
              selected: false
            }
          ],
        },
        {
          sub_section_name: "Key Dates",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Creation ',
              id: 'creation_date',
              value: false,
              selected: false
            },
            {
              display: 'Final terms',
              id: 'final_terms_date',
              value: false,
              selected: false
            },
            {
              display: 'Expected Closing',
              id: 'expected_closing_date',
              value: false,
              selected: false
            }
          ],
        },
        {
          sub_section_name: "Status",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Completed',
              id: 'revenue_ttm',
              value: false,
              selected: false
            },
            {
              display: 'Announced',
              id: 'ebitda_ttm',
              value: false,
              selected: false
            },
            {
              display: 'Bidding Process',
              id: 'revenue_ttm',
              value: false,
              selected: false
            },
            {
              display: 'Upcoming',
              id: 'ebitda_ttm',
              value: false,
              selected: false
            },
            {
              display: 'Postponed',
              id: 'revenue_ttm',
              value: false,
              selected: false
            },
            {
              display: 'Cancelled',
              id: 'ebitda_ttm',
              value: false,
              selected: false
            },
          ],
        },
      ],
    },
    {
      section_name: 'Deal Type',
      sub_sections: [
        {
          sub_section_name: "Buy out types",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Revenue TTM',
              id: 'revenue_ttm',
              value: false,
              selected: false
            },
            {
              display: 'EBITDA TTM',
              id: 'ebitda_ttm',
              value: false,
              selected: false
            }
          ],
        },
      ],
    },
    {
      section_name: 'Deal Financials',
      sub_sections: [
        {
          sub_section_name: "Financials",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Revenue TTM',
              id: 'revenue_ttm',
              value: false,
              selected: false
            },
            {
              display: 'EBITDA TTM',
              id: 'ebitda_ttm',
              value: false,
              selected: false
            }
          ],
        },
      ],
    },
    {
      section_name: 'Debt Types',
      sub_sections: [
        {
          sub_section_name: "Financials",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Revenue TTM',
              id: 'revenue_ttm',
              value: false,
              selected: false
            },
            {
              display: 'EBITDA TTM',
              id: 'ebitda_ttm',
              value: false,
              selected: false
            }
          ],
        },
      ],
    },
    {
      section_name: 'Industries',
      sub_sections: [
        {
          sub_section_name: "Financials",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Revenue TTM',
              id: 'revenue_ttm',
              value: false,
              selected: false
            },
            {
              display: 'EBITDA TTM',
              id: 'ebitda_ttm',
              value: false,
              selected: false
            }
          ],
        },
      ],
    },
    {
      section_name: 'Sponsor Details',
      sub_sections: [
        {
          sub_section_name: "Financials",
          sub_section_type: 'checkmark',
          select_all: false,
          sub_section_values: [
            {
              display: 'Revenue TTM',
              id: 'revenue_ttm',
              value: false,
              selected: false
            },
            {
              display: 'EBITDA TTM',
              id: 'ebitda_ttm',
              value: false,
              selected: false
            }
          ],
        },
      ],
    },
  ],
};







export {dealResults, dealFilters};
