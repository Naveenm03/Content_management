package view;

import moldel.SystemManager;
import java.awt.BorderLayout;
import java.awt.CardLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;

public class GUI {

    SystemManager sm;
    GUI thisGUI = this;
    private final JFrame mainWindow;
    private final JScrollPane scrollFilmsFrame;

//    private final JPanel searchPanel;
    private final JPanel dataPanel;
    private final JPanel lendPanel;
    private final JPanel filmsPanel;
    private final JPanel buttonsPanel;

    private JTextField titleTextField;
    private JTextField directorTextField;
    private JTextField yearTextField;
    private JTextField lengthTextField;
    private JTextField mainCharacterTextField;
    private JComboBox<String> mediaSelect;
    private JCheckBox originalCheck;
    private JCheckBox lendCheck;
    private CardLayout cl;
    private JButton lendViewButton;

    GUI() {
        sm = new SystemManager();
        mainWindow = new JFrame("Film Database");
        mainWindow.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        mainWindow.setLayout(new BorderLayout());

//        searchPanel = new JPanel();
//        JButton searchButton = new JButton("Search");
//        searchButton.addActionListener(new SearchButtonActionListener());
//        searchPanel.add(searchButton);
//
//        titleTextField = new JTextField("Title");
//        titleTextField.setPreferredSize(new Dimension(100, 24));
//        searchPanel.add(titleTextField);
//
//        directorTextField = new JTextField("Director");
//        directorTextField.setPreferredSize(new Dimension(100, 24));
//        searchPanel.add(directorTextField);
//
//        yearTextField = new JTextField("Year");
//        yearTextField.setPreferredSize(new Dimension(40, 24));
//        searchPanel.add(yearTextField);
//
//        mainCharacterTextField = new JTextField("Main Character");
//        mainCharacterTextField.setPreferredSize(new Dimension(100, 24));
//        searchPanel.add(mainCharacterTextField);
//
//        lengthTextField = new JTextField("Length");
//        lengthTextField.setPreferredSize(new Dimension(30, 24));
//        searchPanel.add(lengthTextField);
//
//        String[] medias = new String[]{"Both", "DVD", "VHS"};
//        mediaSelect = new JComboBox<>(medias);
//        searchPanel.add(mediaSelect);
//
//        originalCheck = new JCheckBox("Original");
//        originalCheck.setSelected(true);
//        searchPanel.add(originalCheck);
//
//        lendCheck = new JCheckBox("Lent");
//        searchPanel.add(lendCheck);
//        mainWindow.getContentPane().add(searchPanel, BorderLayout.NORTH);

        dataPanel = new JPanel();
        cl = new CardLayout();
        dataPanel.setLayout(cl);

        lendPanel = new JPanel();
        lendPanel.add(new JScrollPane(new JTable(sm.getLtb())));

        filmsPanel = new JPanel();
        filmsPanel.setBorder(BorderFactory.createLineBorder(Color.black));

        reloadFilmPanel();

        scrollFilmsFrame = new JScrollPane(filmsPanel, JScrollPane.VERTICAL_SCROLLBAR_ALWAYS, JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS);
        dataPanel.add(scrollFilmsFrame, "films");
        dataPanel.add(lendPanel, "lent");
        mainWindow.getContentPane().add(dataPanel);
        buttonsPanel = new JPanel();
        JButton newFilmButton = new JButton("New Film");
        newFilmButton.addActionListener(new NewFilmButtonActionListener());

        buttonsPanel.add(newFilmButton, BorderLayout.WEST);
        lendViewButton = new JButton("Lent Films");
        lendViewButton.addActionListener(new LendButtonActionListener());
        buttonsPanel.add(lendViewButton);
        mainWindow.getContentPane().add(buttonsPanel, BorderLayout.SOUTH);

        mainWindow.pack();
        mainWindow.setVisible(true);
    }

    public void reloadFilmPanel() {
        filmsPanel.removeAll();
        filmsPanel.revalidate();
        filmsPanel.repaint();
        sm.getFilms().forEach((film) -> {
            FilmPanel filmPanel = new FilmPanel(film, thisGUI);
            filmsPanel.add(filmPanel.getFilmPanel());
        });
    }

    class LendButtonActionListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            cl.next(dataPanel);
            if ("Lent Films".equals(lendViewButton.getText())) {
                lendViewButton.setText("Films");
            } else {
                lendViewButton.setText("Lent Films");
            }
        }
    }

    class NewFilmButtonActionListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent ae) {
            NewFilmWindow newFilmWindow = new NewFilmWindow(thisGUI);
        }
    }

//    class SearchButtonActionListener implements ActionListener {
//        @Override
//        public void actionPerformed(ActionEvent ae) {
//            SystemManager.searchFilms(titleTextField.getText(), directorTextField.getText(),
//                    yearTextField.getText(), mainCharacterTextField.getText(),
//                    lengthTextField.getText(), mediaSelect.getSelectedItem().toString(),
//                    originalCheck.isSelected(), lendCheck.isSelected());
//            reloadFilmPanel();
//        }
//    }
}
