(function() {
  let data = [];
  const limit = 30;

  const getOrders = async page => {
    const response = await fetch(
      `https://tiki.vn/api/v2/me/orders?page=${page}&limit=${limit}`
    );
    const json = await response.json();

    const orders = json.data.reduce((acc, cur) => {
      if (cur.status === 'hoan_thanh') {
        acc.push({
          date: cur.created_at * 1000,
          desc: cur.description,
          total: cur.grand_total
        });
        return acc;
      }
      return acc;
    }, []);

    data = [...data, ...orders];
    return json.paging;
  };

  const print = () => {
    console.clear();
    let total = 0;

    const formatted = data.reduce((acc, cur) => {
      total += cur.total;
      acc.push({
        Date: new Date(cur.date).toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }),
        Description: cur.desc,
        total: new Intl.NumberFormat('vi-VN').format(cur.total) + 'đ'
      });
      return acc;
    }, []);

    console.table(formatted);
    console.log(
      'Tổng thiệt hại: ' + new Intl.NumberFormat('vi-VN').format(total) + 'đ'
    );
  };

  const run = () => {
    console.log('Loading...please wait!');

    const recur = async page => {
      const paging = await getOrders(page);
      if (paging.last_page > page) {
        await recur(page + 1);
      } else {
        print();
      }
    };

    recur(1);
  };

  run();
})();
