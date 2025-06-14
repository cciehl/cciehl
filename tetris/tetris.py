import curses
import random
import time

BOARD_WIDTH = 10
BOARD_HEIGHT = 20
TICK = 0.5

SHAPES = {
    'I': [(0,1),(1,1),(2,1),(3,1)],
    'O': [(1,0),(2,0),(1,1),(2,1)],
    'T': [(1,0),(0,1),(1,1),(2,1)],
    'S': [(1,0),(2,0),(0,1),(1,1)],
    'Z': [(0,0),(1,0),(1,1),(2,1)],
    'J': [(0,0),(0,1),(1,1),(2,1)],
    'L': [(2,0),(0,1),(1,1),(2,1)],
}

PIVOT = (1,1)


def rotate(coords):
    px, py = PIVOT
    return [(px - (y - py), py + (x - px)) for x, y in coords]


def create_board():
    return [[0] * BOARD_WIDTH for _ in range(BOARD_HEIGHT)]


def collision(board, coords, pos):
    for x, y in coords:
        bx = x + pos[0]
        by = y + pos[1]
        if bx < 0 or bx >= BOARD_WIDTH or by >= BOARD_HEIGHT:
            return True
        if by >= 0 and board[by][bx]:
            return True
    return False


def merge(board, coords, pos):
    for x, y in coords:
        bx = x + pos[0]
        by = y + pos[1]
        if 0 <= by < BOARD_HEIGHT:
            board[by][bx] = 1


def clear_lines(board):
    new_board = [row for row in board if not all(row)]
    lines_cleared = BOARD_HEIGHT - len(new_board)
    while len(new_board) < BOARD_HEIGHT:
        new_board.insert(0, [0]*BOARD_WIDTH)
    return new_board, lines_cleared


def draw(stdscr, board, coords, pos, score):
    stdscr.clear()
    for y in range(BOARD_HEIGHT):
        for x in range(BOARD_WIDTH):
            if board[y][x]:
                stdscr.addstr(y, x*2, '[]')
    for x, y in coords:
        bx = x + pos[0]
        by = y + pos[1]
        if by >= 0:
            stdscr.addstr(by, bx*2, '[]')
    stdscr.addstr(0, BOARD_WIDTH*2 + 2, f'Score: {score}')
    stdscr.refresh()


def main(stdscr):
    curses.curs_set(0)
    stdscr.nodelay(True)
    board = create_board()
    current = random.choice(list(SHAPES.values()))
    pos = [3, -2]
    score = 0
    last_move = time.time()

    while True:
        if time.time() - last_move > TICK:
            if not collision(board, current, (pos[0], pos[1]+1)):
                pos[1] += 1
            else:
                merge(board, current, pos)
                board, lines = clear_lines(board)
                score += lines
                current = random.choice(list(SHAPES.values()))
                pos = [3, -2]
                if collision(board, current, pos):
                    break
            last_move = time.time()

        draw(stdscr, board, current, pos, score)

        try:
            key = stdscr.getkey()
        except curses.error:
            key = None

        if key == 'KEY_LEFT' and not collision(board, current, (pos[0]-1, pos[1])):
            pos[0] -= 1
        elif key == 'KEY_RIGHT' and not collision(board, current, (pos[0]+1, pos[1])):
            pos[0] += 1
        elif key == 'KEY_DOWN' and not collision(board, current, (pos[0], pos[1]+1)):
            pos[1] += 1
        elif key == 'KEY_UP':
            rotated = rotate(current)
            if not collision(board, rotated, pos):
                current = rotated
        elif key in ('q', 'Q'):
            break

    stdscr.nodelay(False)
    stdscr.addstr(BOARD_HEIGHT//2, BOARD_WIDTH - 4, 'Game Over')
    stdscr.addstr(BOARD_HEIGHT//2 + 1, BOARD_WIDTH - 6, f'Score: {score}')
    stdscr.refresh()
    stdscr.getkey()


if __name__ == '__main__':
    curses.wrapper(main)
