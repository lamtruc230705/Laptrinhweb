INSERT INTO products (name, description, price, stock, image, created_by_user_id, created_by_role, status, is_featured)
SELECT 'Box JimmySea', 'Hop qua tang JimmySea', 1, 25, '/uploads/products/box-jimmysea.jpg', u.id, 'admin', 'active', TRUE FROM users u WHERE u.role = 'admin' AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Box JimmySea') LIMIT 1;

INSERT INTO products (name, description, price, stock, image, created_by_user_id, created_by_role, status, is_featured)
SELECT 'Card Clover', 'Bo card Clover', 1, 50, '/uploads/products/card-clover.jpg', u.id, 'admin', 'active', TRUE FROM users u WHERE u.role = 'admin' AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Card Clover') LIMIT 1;

INSERT INTO products (name, description, price, stock, image, created_by_user_id, created_by_role, status, is_featured)
SELECT 'Tui sach GMTheeVN', 'Tui sach GMTheeVN', 1, 30, '/uploads/products/tui-sach.jpg', u.id, 'admin', 'active', TRUE FROM users u WHERE u.role = 'admin' AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Tui sach GMTheeVN') LIMIT 1;

INSERT INTO products (name, description, price, stock, image, created_by_user_id, created_by_role, status, is_featured)
SELECT 'Ao Phong Domia', 'Ao thun nam cao cap', 1, 40, '/uploads/products/ao-phong-domia.jpg', u.id, 'artist', 'active', FALSE FROM users u WHERE u.email = 'joong@gmail.com' AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Ao Phong Domia');

INSERT INTO products (name, description, price, stock, image, created_by_user_id, created_by_role, status, is_featured)
SELECT 'Box Yours Win Metawin', 'Hop qua tang dac biet', 1, 15, '/uploads/products/box-yours.jpg', u.id, 'artist', 'active', FALSE FROM users u WHERE u.email = 'joong@gmail.com' AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Box Yours Win Metawin');

INSERT INTO product_artists (product_id, artist_id)
SELECT p.id, a.id
FROM products p
JOIN artists a ON a.stage_name = 'Joong Archen'
LEFT JOIN product_artists pa ON pa.product_id = p.id AND pa.artist_id = a.id
WHERE p.created_by_role = 'artist' AND pa.id IS NULL;
