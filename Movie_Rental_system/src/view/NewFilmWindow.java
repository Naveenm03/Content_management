package view;

import moldel.Actor;
import moldel.MediaForm;
import moldel.SystemManager;
import view.GUI;
import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.util.ArrayList;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.filechooser.FileSystemView;

public class NewFilmWindow {
    private final JFrame window;
    private final JLabel fileSelectLabel;
    private GUI parentGUI;
    
    private final JTextField titleTextField;
    private final JTextField directorTextField;
    private final JTextField yearTextField;
    private final JTextField mainCharactersTextField;
    private final JTextField lengthTextField;
    

    private final JComboBox<String> mediaSelect;
    private final JCheckBox originalCheck;
    
    public NewFilmWindow(GUI parentGUI) {
        this.parentGUI = parentGUI;
        window = new JFrame("Add New Film");      
        GridLayout windowLayout = new GridLayout(0, 1);
        
        JPanel dataPanel = new JPanel();
        dataPanel.setLayout(windowLayout);
        
        titleTextField = new JTextField("Title");
        titleTextField.setPreferredSize(new Dimension(100, 24));
        dataPanel.add(titleTextField);
        
        directorTextField = new JTextField("Director");
        directorTextField.setPreferredSize(new Dimension(100, 24));
        dataPanel.add(directorTextField);
        
        yearTextField = new JTextField("Year");
        yearTextField.setPreferredSize(new Dimension(40, 24));
        dataPanel.add(yearTextField);
        
        mainCharactersTextField = new JTextField("Main Characters");
        mainCharactersTextField.setPreferredSize(new Dimension(100, 24));
        dataPanel.add(mainCharactersTextField);
        
        lengthTextField = new JTextField("Length");
        lengthTextField.setPreferredSize(new Dimension(30, 24));
        dataPanel.add(lengthTextField);
        
        String[] medias = new String[]{"DVD", "VHS"};
        mediaSelect = new JComboBox<>(medias);
        dataPanel.add(mediaSelect);
        
        fileSelectLabel = new JLabel("No cover image selected");
        JButton getFileButton = new JButton("Browse");
        getFileButton.addActionListener(new FileSelectActionListener());
        dataPanel.add(fileSelectLabel);
        dataPanel.add(getFileButton);
        
        originalCheck = new JCheckBox("Original");
        originalCheck.setSelected(true);
        dataPanel.add(originalCheck);

        window.getContentPane().add(dataPanel, BorderLayout.NORTH);
        
        JPanel buttonsPanel = new JPanel();
        JButton addButton = new JButton("Add");
        addButton.addActionListener(new AddButtonActionListener());
        buttonsPanel.add(addButton);
       
        JButton cancelButton = new JButton("Cancel");
        cancelButton.addActionListener(new CancelActionListener());
        buttonsPanel.add(cancelButton);
        
        window.getContentPane().add(buttonsPanel, BorderLayout.SOUTH);
        
        window.pack();
        window.setVisible(true);
    }
    
    class FileSelectActionListener implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent ae) {
            JFileChooser jfc = new JFileChooser(FileSystemView.getFileSystemView().getHomeDirectory());       
            int returnValue = jfc.showOpenDialog(null);
            if (returnValue == JFileChooser.APPROVE_OPTION) {
                File selectedFile = jfc.getSelectedFile();
                fileSelectLabel.setText(selectedFile.getName());
            }
        }  
    }
    
    class CancelActionListener implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent ae) {
            window.dispose();
        }
    }
    
    class AddButtonActionListener implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
            ArrayList<Actor> mainCharacters = new ArrayList<>();
            String[] actorNames = mainCharactersTextField.getText().split(";");
            for (int i = 0; i < actorNames.length; i++) {
                mainCharacters.add(new Actor(actorNames[i]));
            }
            
            SystemManager.addNewFilm(titleTextField.getText(), directorTextField.getText(), 
                                     Integer.parseInt(lengthTextField.getText()),
                                     Integer.parseInt(yearTextField.getText()), 
                                     MediaForm.valueOf(mediaSelect.getSelectedItem().toString()), 
                                     fileSelectLabel.getText(), originalCheck.isSelected(), 
                                     mainCharacters);
            
            window.dispose();
            parentGUI.reloadFilmPanel();
        }
    }
}
